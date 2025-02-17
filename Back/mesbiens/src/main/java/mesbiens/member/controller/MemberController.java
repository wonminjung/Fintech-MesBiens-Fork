package mesbiens.member.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;



import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import mesbiens.member.dto.FindPasswordRequest;
import mesbiens.member.dto.LoginRequest;
import mesbiens.member.dto.MemberDTO;
import mesbiens.member.dto.MemberResponseDTO;
import mesbiens.member.service.CustomAuthenticationException;
import mesbiens.member.service.LoginRecordService;
import mesbiens.member.service.MemberService;
import mesbiens.member.service.VerificationCodeService;
import mesbiens.member.vo.MemberVO;
import mesbiens.security.JwtTokenProvider;

@CrossOrigin(origins = "http://localhost:4000")
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor // Lombok 사용하면 생성자 자동 생성
public class MemberController {
	private final MemberService memberService;
	private final VerificationCodeService verificationCodeService;
	private final LoginRecordService loginRecordService;
	private final BCryptPasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;

	private String getClientIp(HttpServletRequest request) {
		String header = request.getHeader("X-Forwarded-For");
		if (header == null || header.isEmpty()) {
			return request.getRemoteAddr();
		}
		return header.split(",")[0];
	}

	// Refresh Token을 이용한 Access Token 재발급 API
	@PostMapping("/token/refresh")
	public ResponseEntity<String> refreshToken(HttpServletRequest request, HttpServletResponse response) {
		String refreshToken = jwtTokenProvider.getRefreshTokenFromCookie(request);

		if (refreshToken != null && jwtTokenProvider.validateToken(refreshToken)) { // boolean 비교
			String memberId = jwtTokenProvider.getMemberId(refreshToken);
			String newAccessToken = jwtTokenProvider.createAccessToken(memberId, "USER_ROLES");

			jwtTokenProvider.addJwtTokenToCookie(response, newAccessToken);
			return ResponseEntity.ok("새로운 Access Token이 발급되었습니다.");
		}

		return ResponseEntity.status(401).body("Refresh Token이 유효하지 않습니다.");
	}

	// 회원가입 API (수정됨)
	@PostMapping("/register")
	public ResponseEntity<?> registerMember(@RequestBody MemberDTO memberDTO) {
		try {
			MemberResponseDTO responseDTO = memberService.register(memberDTO);
			return ResponseEntity.ok(responseDTO);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	// 로그인
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response,
			HttpServletRequest request) {
		System.out.println("로그인 요청 도착! ID: " + loginRequest.getMemberId());

		// IP 주소 가져오기
		String ip = getClientIp(request); // 클라이언트 IP 가져오기

		// 요청한 로그인 아이디에 앞뒤 공백을 제거 하여 공백이 있는지 확인하고 공백이 있으면 에러 발생
		if (loginRequest.getMemberId() == null || loginRequest.getMemberId().trim().isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원 아이디가 누락되었습니다.");
		}

		// 요청한 로그인 아이디에 공백이 있는지 확인
		if (loginRequest.getMemberId().contains(" ")) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("아이디에 공백을 포함할 수 없습니다");
		}

		// optional 객체 값이 존재할 수도 있고 없을수도 있는 상황을 처리하기 위해 사용 optional<MemberVO>는 MemberVO
		// 객체값이 존재할 수도 있고 없을 수도 있다.
		Optional<MemberVO> memberOpt = memberService.findByMemberId(loginRequest.getMemberId());

		// isEmpty() 값이 있는지 없는지 확인하고 값이 있다면 true 없다면 false 따라서 값이 없으면 에러가 발생
		if (memberOpt.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
		}

		MemberVO member = memberOpt.get();
		System.out.println("Member Name: " + member.getMemberName()); // 로그로 확인

		// 비밀번호 검증
		if (!passwordEncoder.matches(loginRequest.getPassword(), member.getMemberPassword())) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 일치하지 않습니다.");
		}

		// 로그인 기록 저장
		loginRecordService.saveLoginRecord(member, ip, "S", null); // 로그인 성공 상태(S)로 저장

		// JWT 생성 및 쿠키 설정
		// validity를 1시간 (3600000ms)로 설정
		long validity = 3600000; // 1시간
		String token = jwtTokenProvider.createToken(member.getMemberId(), "USER_ROLES", validity);
		jwtTokenProvider.addJwtTokenToCookie(response, token);

		System.out.println("로그인 성공! JWT 발급: " + token);

		return ResponseEntity.ok(new MemberResponseDTO(member));// (new MemberResponseDTO(member.getMemberId(),
																// member.getMemberName(), member.getMemberEmail()));
	}

	// 로그아웃 (쿠키 삭제 + 로그인 기록 갱신)
	@PostMapping("/logout/{recordNo}")
	public ResponseEntity<String> logout(@PathVariable("recordNo") int recordNo, HttpServletResponse response) {
		try {
			// 로그인 기록 업데이트
			loginRecordService.logout(recordNo);

			// JWT 쿠키 삭제 (강제 리디렉트 방지)
			 Cookie cookie = new Cookie("Authorization", null);
		        cookie.setHttpOnly(true);
		        cookie.setSecure(true); // HTTPS 환경에서만 적용
		        cookie.setPath("/"); // 모든 경로에서 쿠키 삭제 적용
		        cookie.setMaxAge(0); // 즉시 만료
		        response.addCookie(cookie);

			// 클라이언트가 추가적인 처리를 할 수 있도록 JSON 응답 반환
			return ResponseEntity.ok().body("{\"message\": \"로그아웃 성공\"}");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("{\"message\": \"로그아웃 실패: " + e.getMessage() + "\"}");
		}
	}

	// 비밀번호 검증
	@PostMapping("/validate-password")
	public ResponseEntity<?> validatePassword(@RequestBody Map<String, String> request,
			@RequestHeader(value = "Authorization", required = false) String token) {
		// JWT 토큰 확인 로그 추가
		System.out.println("받은 Authorization 헤더: " + token);

		if (token == null || !token.startsWith("Bearer ")) {
			return ResponseEntity.status(401).body("로그인이 필요합니다. (Authorization 헤더 없음)");
		}

		// JWT에서 사용자 ID 가져오기
		String memberId;
		try {
			memberId = jwtTokenProvider.getMemberId(token.replace("Bearer ", ""));
		} catch (Exception e) {
			return ResponseEntity.status(401).body("JWT 토큰이 유효하지 않습니다.");
		}

		System.out.println("JWT에서 추출한 memberId: " + memberId);

		if (memberId == null) {
			return ResponseEntity.status(401).body("로그인이 필요합니다. (유효하지 않은 토큰)");
		}

		Optional<MemberVO> memberOpt = memberService.findByMemberId(memberId);
		if (memberOpt.isEmpty()) {
			return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");
		}

		MemberVO member = memberOpt.get();
		String password = request.get("password");

		// 비밀번호 검증 로그 추가
		System.out.println("입력된 비밀번호: " + password);

		if (!passwordEncoder.matches(password, member.getMemberPassword())) {
			return ResponseEntity.status(401).body("비밀번호가 일치하지 않습니다.");
		}

		return ResponseEntity.ok("비밀번호 검증 성공");
	}

	// 회원 탈퇴
	@DeleteMapping("/delete")
	public ResponseEntity<String> deleteMember(@RequestHeader("Authorization") String authorizationHeader, HttpServletResponse response) {
	    if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
	        throw new CustomAuthenticationException("JWT 토큰이 제공되지 않았습니다.");
	    }

	    String token = authorizationHeader.substring(7); // "Bearer " 이후의 실제 토큰 부분만 추출
	    memberService.deleteMember(token);
	    
	    // 회원 탈퇴 후 JWT 쿠키 삭제
	    removeJwtTokenFromCookie(response);
	    
	    return ResponseEntity.ok("회원 삭제 성공");
	}
	private void removeJwtTokenFromCookie(HttpServletResponse response) {
		Cookie cookie = new Cookie("jwt", null);
	    cookie.setHttpOnly(true);
	    cookie.setSecure(true);  // HTTPS 환경에서만 전송되도록 설정 (필요시 사용)
	    cookie.setPath("/");  // 전체 경로에서 사용 가능하도록 설정
	    cookie.setMaxAge(0);  // 쿠키의 유효 기간을 0으로 설정하여 삭제
	    response.addCookie(cookie);
		
	}

	// 사용자 정보 조회 (JWT 인증 필수)
	@GetMapping("/me")
	public ResponseEntity<MemberResponseDTO> getMember(HttpServletRequest request) {
		String token = jwtTokenProvider.extractTokenFromRequest(request);

		if (token == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // 토큰이 없으면 Unauthorized 반환
		}

		// 토큰이 유효한지 확인
		if (!jwtTokenProvider.validateToken(token)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // 유효하지 않으면 Unauthorized 반환
		}

		// 토큰이 유효하다면 memberId 추출
		String memberId = jwtTokenProvider.getMemberId(token);

		// memberId로 사용자 정보 조회
		Optional<MemberVO> memberOpt = memberService.findByMemberId(memberId);

		if (memberOpt.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 사용자가 없으면 404 Not Found 반환
		}

		MemberVO member = memberOpt.get();
		return ResponseEntity.ok(new MemberResponseDTO(member)); // 정상적으로 사용자 정보를 반환
	}

	@GetMapping("/get-jwt")
	public ResponseEntity<Map<String, String>> getJwtFromCookie(
			@CookieValue(name = "jwt", required = false) String jwt) {
		if (jwt == null || jwt.isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // 토큰이 없으면 401 반환
		}

		Map<String, String> response = new HashMap<>();
		response.put("jwt", jwt);

		return ResponseEntity.ok(response); // { "jwt": "토큰값" } 반환
	}

	// 회원 아이디 찾기
	@GetMapping("/find-id/{email}")
	public ResponseEntity<Map<String, String>> findMemberId(@PathVariable("email") String email) {
		String memberId = memberService.findMemberIdByEmail(email).orElse(null);

		if (memberId == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "회원 정보를 찾을 수 없습니다."));
		}
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON); // JSON 명확히 설정

		return ResponseEntity.ok(Map.of("id", memberId));
	}

	// 인증번호 요청
	@PostMapping("/request-verification")
	public ResponseEntity<String> requestVerificationCode(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		try {
			memberService.requestVerificationCode(email);
			return ResponseEntity.ok("인증번호가 이메일로 전송되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("인증번호 발송 실패: " + e.getMessage());
		}
	}

	// 인증번호 검증
	@PostMapping("/verify-code")
	public ResponseEntity<String> verifyCode(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String code = request.get("code");

		try {
			if (verificationCodeService.verifyCode(email, code)) {
				return ResponseEntity.ok("인증 성공");
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 실패");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("인증 실패: " + e.getMessage());
		}
	}

	// 비밀번호 찾기 (재설정 요청)
	@PostMapping("/find-password")
	public ResponseEntity<String> findPassword(@RequestBody FindPasswordRequest request) {
		try {
			memberService.sendPasswordResetEmail(request.getEmail());
			return ResponseEntity.ok("비밀번호 재설정 이메일을 전송했습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("비밀번호 재설정 요청 실패: " + e.getMessage());
		}
	}

	// 비밀번호 변경
	@PostMapping("/reset-password")
	public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String newPassword = request.get("newPassword");

		try {
			memberService.resetPassword(email, newPassword); // 비밀번호 변경 로직
			return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("비밀번호 변경 실패: " + e.getMessage());
		}
	}
}