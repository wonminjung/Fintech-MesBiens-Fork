package mesbiens.member.vo;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "verification_code")
public class VerificationCode {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성 전략 (자동 증가)
	    @Column(name = "verification_code_id") // 인증 코드 ID
	    private int verificationCodeId;
	    
        // 즉시 로딩으로 변경 VerificationCode 객체를 조회할 때 MemberVO도 즉시 로드되므로, MemberVO가 null로 나오는 문제를 방지
	    @ManyToOne(fetch = FetchType.EAGER)
	   
	    @JoinColumn(name = "member_no", nullable = false)  // 'member_no'는 외래 키
	    private MemberVO memberVO; // 이메일 인증을 받는 회원

	    @Column(name = "email_code", nullable = false, length = 6)  // 인증 코드 (6자리)
	    private String emailCode;

	    @Column(name = "expiration_time", nullable = false)  // 인증 코드 만료 시간
	    private LocalDateTime expirationTime;
	    
	    @Column(name = "used", nullable = false) // 인증 코드 사용 여부 (기본값은 false)
	    private boolean used = false;

	    public VerificationCode() {
	    }

	    // 생성자
	    public VerificationCode(MemberVO memberVO, String code, LocalDateTime expirationTime) {
	        this.memberVO = memberVO;
	        this.emailCode = code;
	        this.expirationTime = expirationTime;
	    }
	 // 인증 코드가 사용되었는지 확인하는 메서드
	    public boolean isUsed() {
	        return used;
	    }

	    // 인증 코드 사용 상태를 설정하는 메서드 (선택적으로 사용)
	    public void setUsed(boolean used) {
	        this.used = used;
	    }
	}