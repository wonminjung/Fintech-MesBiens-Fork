package mesbiens.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import mesbiens.member.dto.LoginRequest;
import mesbiens.member.dto.MemberDTO;
import mesbiens.member.dto.MemberResponseDTO;
import mesbiens.member.service.LoginRecordService;
import mesbiens.member.service.MemberService;
import mesbiens.member.vo.MemberVO;
import mesbiens.security.JwtTokenProvider;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;
//@CrossOrigin(origins = "http://localhost:4000")
@RestController
@RequestMapping("/members")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private LoginRecordService loginRecordService; 

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // 비밀번호 암호화용
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider; 
    /*
    public MemberController(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }
*/
    //  Refresh Token을 이용한 Access Token 재발급 API
    @PostMapping("/token/refresh")
    public ResponseEntity<String> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtTokenProvider.getRefreshTokenFromCookie(request);

        if (refreshToken != null && jwtTokenProvider.validateToken(refreshToken)) { //  boolean 비교
            String memberId = jwtTokenProvider.getMemberId(refreshToken);
            String newAccessToken = jwtTokenProvider.createAccessToken(memberId, "USER_ROLE");

            jwtTokenProvider.addJwtTokenToCookie(response, newAccessToken);
            return ResponseEntity.ok("새로운 Access Token이 발급되었습니다.");
        }

        return ResponseEntity.status(401).body("Refresh Token이 유효하지 않습니다.");
    }


    //  사용자 등록 (회원가입)
    @PostMapping("/register")
    public ResponseEntity<MemberResponseDTO> registerMember(@RequestBody MemberDTO memberDTO) {
        MemberResponseDTO registeredMember = memberService.registerMember(memberDTO);
        return ResponseEntity.ok(registeredMember);
    }

    //  로그인              
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        System.out.println("로그인 요청 도착! ID: " + loginRequest.getMemberId());
        
        //요청한 로그인 아이디에 앞뒤 공백을 제거 하여 공백이 있는지 확인하고 공백이 있으면 에러 발생
        if (loginRequest.getMemberId() == null || loginRequest.getMemberId().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원 아이디가 누락되었습니다.");
        }
        
        //요청한 로그인 아이디에 공백이 있는지 확인
        if(loginRequest.getMemberId().contains(" ")) {
        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("아이디에 공백을 포함할 수 없습니다");
        }

        //optional 객체 값이 존재할 수도 있고 없을수도 있는 상황을 처리하기 위해 사용 optional<MemberVO>는 MemberVO 객체값이 존재할 수도 있고 없을 수도 있다.
        Optional<MemberVO> memberOpt = memberService.findByMemberId(loginRequest.getMemberId());
        
        //isEmpty() 값이 있는지 없는지 확인하고 값이 있다면 true 없다면 false 따라서 값이 없으면 에러가 발생
        if (memberOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        }

        MemberVO member = memberOpt.get();

        // 비밀번호 검증
        if (!passwordEncoder.matches(loginRequest.getPassword(), member.getMemberPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 일치하지 않습니다.");
        }

        // JWT 생성 및 쿠키 설정
        // validity를 1시간 (3600000ms)로 설정
        long validity = 3600000; // 1시간
        String token = jwtTokenProvider.createToken(member.getMemberId(), "USER_ROLE", validity);
        jwtTokenProvider.addJwtTokenToCookie(response, token);

        System.out.println("로그인 성공! JWT 발급: " + token);

        return ResponseEntity.ok(new MemberResponseDTO(member));//(new MemberResponseDTO(member.getMemberId(), member.getMemberName(), member.getMemberEmail()));
    }
    
    
    
    
    //  로그아웃 (쿠키 삭제 + 로그인 기록 갱신)
    @PostMapping("/logout/{recordNo}")
    public ResponseEntity<String> logout(@PathVariable("recordNo") int recordNo, HttpServletResponse response) {
        try {
            // 로그인 기록 업데이트
            loginRecordService.logout(recordNo);

            // JWT 쿠키 삭제
            jwtTokenProvider.removeJwtTokenFromCookie(response);

            return ResponseEntity.ok("로그아웃 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("로그아웃 실패: " + e.getMessage());
        }
    }

    //  사용자 정보 조회 (JWT 검증 필수)
    @GetMapping("/me")
    public ResponseEntity<MemberResponseDTO> getMember(HttpServletRequest request) {
        String token = jwtTokenProvider.extractTokenFromRequest(request);

        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        // 토큰이 유효한지 확인
        if (!jwtTokenProvider.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        // 토큰이 유효하다면 memberId 추출
        String memberId = jwtTokenProvider.getMemberId(token);

        Optional<MemberVO> memberOpt = memberService.findByMemberId(memberId);

        if (memberOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        MemberVO member = memberOpt.get();
        return ResponseEntity.ok(new MemberResponseDTO(member));//(new MemberResponseDTO(member.getMemberId(), member.getMemberName(), member.getMemberEmail()));
}
}