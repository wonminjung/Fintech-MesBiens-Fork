package mesbiens.member.service;

import java.util.Optional;

import org.springframework.boot.json.JsonWriter.Member;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.servlet.http.HttpServletResponse;
import mesbiens.member.dto.MemberDTO;
import mesbiens.member.dto.MemberResponseDTO;
import mesbiens.member.repository.LoginRecordRepository;
import mesbiens.member.repository.MemberRepository;
import mesbiens.member.vo.MemberVO;
import mesbiens.security.JwtTokenProvider;

@Service
@Transactional
public class MemberService {

	private final MemberRepository memberRepository;
	private final LoginRecordService loginRecordService;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	private final EmailService emailService;
	private final VerificationCodeService verificationCodeService;
	private final LoginRecordRepository loginRecordRepository;

	public MemberService(MemberRepository memberRepository, LoginRecordService loginRecordService,
			PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider, EmailService emailService,
			VerificationCodeService verificationCodeService, LoginRecordRepository loginRecordRepository) {

		this.memberRepository = memberRepository;
		this.loginRecordService = loginRecordService;
		this.passwordEncoder = passwordEncoder;
		this.jwtTokenProvider = jwtTokenProvider;
		this.emailService = emailService;
		this.verificationCodeService = verificationCodeService;
		this.loginRecordRepository = loginRecordRepository;

	}

	// 사용자 등록 (회원가입)
	public MemberResponseDTO register(MemberDTO memberDTO) {
		if (memberRepository.findByMemberEmail(memberDTO.getMemberEmail()).isPresent()
				|| memberRepository.findByMemberId(memberDTO.getMemberId()).isPresent()) {
			throw new IllegalArgumentException("이미 존재하는 이메일 또는 ID입니다.");
		}

		if (memberDTO.getMemberPassword() == null || memberDTO.getMemberPassword().isEmpty()) {
			throw new IllegalArgumentException("비밀번호는 필수 입력값입니다.");
		}

		MemberVO member = new MemberVO();
		member.setMemberName(memberDTO.getMemberName());
		member.setMemberEmail(memberDTO.getMemberEmail());
		member.setMemberId(memberDTO.getMemberId());
		member.setMemberPassword(passwordEncoder.encode(memberDTO.getMemberPassword()));
		member.setMemberPhone(memberDTO.getMemberPhone());
		member.setMemberAddress(memberDTO.getMemberAddress());
		member.setMemberBirth(memberDTO.getMemberBirth());
		member.setMemberSnsSignUpYN("N");

		MemberVO savedMember = memberRepository.save(member);

		return new MemberResponseDTO(savedMember);
	}

	// 로그인 (Access Token + Refresh Token 발급)
	public void login(String memberId, String password, String requestIp, HttpServletResponse response) {
		if (memberId == null || memberId.trim().isEmpty()) {
			throw new IllegalArgumentException("아이디를 입력해주세요.");
		}

		MemberVO member = memberRepository.findByMemberId(memberId).orElseThrow(() -> {
			loginRecordService.saveLoginRecord(null, requestIp, "F", "존재하지 않는 사용자 ID");
			return new IllegalArgumentException("존재하지 않는 사용자 ID입니다.");
		});

		if (!passwordEncoder.matches(password, member.getMemberPassword())) {
			loginRecordService.saveLoginRecord(member, requestIp, "F", "비밀번호가 일치하지 않습니다.");
			throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
		}

		loginRecordService.saveLoginRecord(member, requestIp, "S", null);

		// Access Token 및 Refresh Token 생성
		String accessToken = jwtTokenProvider.createAccessToken(member.getMemberId(), "USER_ROLE");
		String refreshToken = jwtTokenProvider.createRefreshToken(member.getMemberId());

		// 쿠키에 JWT 저장
		jwtTokenProvider.addJwtTokenToCookie(response, accessToken);
		jwtTokenProvider.addRefreshTokenToCookie(response, refreshToken);
	}

	// 로그아웃 (쿠키 삭제)
	public void logout(HttpServletResponse response) {
		jwtTokenProvider.removeJwtTokenFromCookie(response);
		jwtTokenProvider.removeRefreshTokenFromCookie(response);
	}

	// 사용자 정보 조회 (JWT 인증 필요)
	public MemberResponseDTO findById(String memberId) {
		MemberVO member = memberRepository.findByMemberId(memberId)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
		return new MemberResponseDTO(member);
	}

	// 회원 인증 (아이디 및 비밀번호 확인)
	public boolean authenticateUser(String memberId, String password) {
		if (memberId == null || memberId.isEmpty()) {
			throw new IllegalArgumentException("아이디를 입력해주세요.");
		}

		if (password == null || password.isEmpty()) {
			throw new IllegalArgumentException("비밀번호를 입력해주세요.");
		}

		Optional<MemberVO> member = memberRepository.findByMemberId(memberId);
		return member.isPresent() && passwordEncoder.matches(password, member.get().getMemberPassword());
	}

	// 사용자 ID로 찾기
	public Optional<MemberVO> findByMemberId(String memberId) {
		return memberRepository.findByMemberId(memberId);
	}

	// 회원 아이디 찾기
	public Optional<String> findMemberIdByEmail(String email) {

		return memberRepository.findByMemberEmail(email).map(MemberVO::getMemberId);
	}

	// 비밀번호 재설정 이메일 전송 (예시: 임시 비밀번호 발급)
	public void sendPasswordResetEmail(String email) {
		Optional<MemberVO> memberOpt = memberRepository.findByMemberEmail(email);

		if (memberOpt.isEmpty()) {
			throw new IllegalArgumentException("해당 이메일로 등록된 사용자가 없습니다.");
		}

		MemberVO member = memberOpt.get();
		String tempPassword = generateTemporaryPassword(); // 임시 비밀번호 생성
		member.setMemberPassword(passwordEncoder.encode(tempPassword));
		memberRepository.save(member);

		// 이메일 전송 로직 (SMTP 등 추가 필요)
		System.out.println("임시 비밀번호: " + tempPassword + " (이메일 전송 필요)");
	}

	// 비밀번호 변경
	public void resetPassword(String email, String newPassword) {
		Optional<MemberVO> memberOpt = memberRepository.findByMemberEmail(email);

		if (memberOpt.isEmpty()) {
			throw new IllegalArgumentException("해당 이메일로 등록된 사용자가 없습니다.");
		}

		MemberVO member = memberOpt.get();
		member.setMemberPassword(passwordEncoder.encode(newPassword));
		memberRepository.save(member);
	}

	// 임시 비밀번호 생성 로직 (간단한 예제)
	private String generateTemporaryPassword() {
		return "Temp1234!"; // 보안 강화를 위해 난수 생성 방식으로 변경 가능
	}

	// 인증코드 생성 및 이메일 전송
	public void requestVerificationCode(String email) {
        try {
            // 인증번호 생성 및 저장 (DB에 저장)
            String verificationCode = verificationCodeService.generateVerificationCode(email);

            // 이메일 전송
            emailService.sendVerificationCode(email, verificationCode);
        } catch (Exception e) {
            // 예외 처리
            throw new RuntimeException("인증번호 발송 중 오류 발생: " + e.getMessage());
        }
    }
    //회원탈퇴
	public void deleteMember(String token) {
		 String memberId = jwtTokenProvider.getMemberId(token); // 토큰에서 memberId 추출
		    
		    if (memberId == null) {
		        throw new RuntimeException("잘못된 토큰입니다. 다시 로그인하세요.");
		    }

		    MemberVO member = memberRepository.findByMemberId(memberId)
		        .orElseThrow(() -> new RuntimeException("해당 회원을 찾을 수 없습니다."));

		    memberRepository.delete(member);
		}
}


































