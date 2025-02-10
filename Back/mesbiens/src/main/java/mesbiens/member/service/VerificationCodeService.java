package mesbiens.member.service;

import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import mesbiens.member.repository.MemberRepository;
import mesbiens.member.repository.VerificationCodeRepository;
import mesbiens.member.vo.MemberVO;
import mesbiens.member.vo.VerificationCode;

@Service
@Transactional  // 트랜잭션을 관리
//인증번호 생성 및 저장 서비스
public class VerificationCodeService {
	
	private static final Logger logger = LoggerFactory.getLogger(VerificationCodeService.class);
	
	private final VerificationCodeRepository verificationCodeRepository;
	private final MemberRepository memberRepository;

    // 생성자
    @Autowired
    public VerificationCodeService(VerificationCodeRepository verificationCodeRepository,
    		MemberRepository memberRepository) {
        this.verificationCodeRepository = verificationCodeRepository;
        this.memberRepository = memberRepository; 
    }

    // 인증 코드 생성 및 저장
    public String generateVerificationCode(String email) {
        String verificationCode = String.valueOf((int) (Math.random() * 900000) + 100000); // 6자리 랜덤 숫자
        
        // 인증 코드 만료 시간 설정 (10분 후)
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(10);
        
        System.out.println("Generated Verification Code: " + verificationCode); // 로그 추가

        // 해당 이메일을 가진 회원 정보 조회
        MemberVO member = findMemberByEmail(email);

        // 인증 코드 객체 생성
        VerificationCode code = new VerificationCode(member, verificationCode, expirationTime);

        // DB에 저장
        verificationCodeRepository.save(code);
        System.out.println("Verification Code Saved: " + code.getVerificationCodeId()); // 로그 추가

        return verificationCode;
    }

    // 이메일로 회원 찾기
    private MemberVO findMemberByEmail(String email) {
    	 return memberRepository.findByMemberEmail(email)
    	            .orElseThrow(() -> 
    	            new IllegalArgumentException("이메일에 해당하는 회원이 없습니다."));
    }

    // 인증 코드 확인
    public boolean verifyCode(String email, String code) {
    	 try {
    	        VerificationCode verificationCode = verificationCodeRepository.findByMemberVOAndEmailCode(findMemberByEmail(email), code);

    	        if (verificationCode != null) {
    	            // 인증 코드가 만료되지 않았고, 사용되지 않았다면 인증 코드가 유효함
    	            if (verificationCode.getExpirationTime().isAfter(LocalDateTime.now()) && !verificationCode.isUsed()) {
    	                // 인증 코드 사용 처리
    	                verificationCode.setUsed(true); // 인증 코드 사용 처리
    	                verificationCodeRepository.save(verificationCode); // 변경된 상태를 DB에 저장
    	                return true;  // 유효한 인증 코드
    	            }
    	        }
    	        return false; // 인증 코드가 만료되었거나 이미 사용된 경우
    	    } catch (Exception e) {
    	        logger.error("인증 코드 검증 중 오류 발생: ", e);  // 오류 발생 시 로깅
    	        return false;
    	    }
    	}
}