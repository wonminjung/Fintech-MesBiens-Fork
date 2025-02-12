package mesbiens.member.vo;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "member")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" }) // 프록시 객체의 직렬화를 방지
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "memberNo")
@SequenceGenerator(name = "member_no_seq_generator", sequenceName = "member_no_seq", initialValue = 1, allocationSize = 1)
public class MemberVO {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "member_no_seq_generator")
	@Column(name = "member_no") // 회원 아이디 (Primary Key)
	private int memberNo;

	@Column(name = "member_name", nullable = false, length = 100) // 회원 이름
	private String memberName;

	@Column(name = "member_email", nullable = false, unique = true, length = 255) // 이메일 (유니크 제약)
	private String memberEmail;

	@Column(name = "member_id", nullable = false, unique = true, length = 50) // 로그인 ID (유니크 제약)
	private String memberId = UUID.randomUUID().toString(); // **기본값 설정**

	@Column(name = "member_password", nullable = false, length = 255) // 비밀번호 (암호화 후 저장)
	private String memberPassword;

	@Column(name = "member_phone", length = 20) // 전화번호
	private String memberPhone;

	@Column(name = "member_address", length = 255) // 주소
	private String memberAddress;

	@Column(name = "member_birth") // 생년월일
	private String memberBirth;

	@CreationTimestamp
	@Column(name = "member_create_at", nullable = false) // 가입 날짜
	private Timestamp memberCreateAt;

	@Column(name = "member_profile") // 유저 프로필
	private String memberProfile;

	@Column(name = "member_sns_sign_up_YN", nullable = false, length = 1) // SNS 가입 여부 ('Y' 또는 'N')
	private String memberSnsSignUpYN;

	private String roles; // 역할을 저장하는 필드

	// 회원과 연결된 인증 코드 목록을 저장하는 필드
	@OneToMany(
			// VerificationCode 클래스에서 memberVO 필드가 MemberVO와의 관계를 매핑
			// cascade = CascadeType.ALL: 회원을 삭제하거나 수정하면 인증 코드도 함께 처리
			// fetch = FetchType.LAZY: 인증 코드 목록을 지연 로딩하여 성능을 최적화
			mappedBy = "memberVO", cascade = CascadeType.ALL, fetch = FetchType.LAZY)

	private List<VerificationCode> verificationCodes; // 회원이 받은 인증 코드 목록

	@OneToMany(mappedBy = "memberNo", // 'SnsInfoVO' 클래스의 'memberNo' 필드로 매핑됨
			cascade = CascadeType.ALL, // 'MemberVO'가 저장되거나 삭제될 때 연관된 'snsInfoList'도 함께 저장/삭제됨
			orphanRemoval = true // 'snsInfoList'에서 'SnsInfoVO' 객체가 제거되면, DB에서도 해당 객체가 삭제됨
	)
	private List<SnsInfoVO> snsAccounts = new ArrayList<>(); // 'SnsInfoVO' 객체들을 담는 리스트
	
	 // ⭐ 비밀번호 기본값 설정 ⭐
    public void setDefaultPasswordIfEmpty() {
        if (this.memberPassword == null || this.memberPassword.isEmpty()) {
            this.memberPassword = new BCryptPasswordEncoder().encode("defaultPassword");
        }
    }

}
