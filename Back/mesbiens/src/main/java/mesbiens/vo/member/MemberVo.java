package mesbiens.vo.member;



import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="members")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MemberVo {
	
	@Id 
	 @GeneratedValue(strategy = GenerationType.IDENTITY) // Primary Key 자동 증가
	 @Column(name = "memberId")
	 private Long memberId; // 회원 아이디 (Primary Key)

	 @Column(name = "name", nullable = false, length = 100) // 회원 이름
	 private String memberName;

	 @Column(name = "email", nullable = false, unique = true, length = 255) // 이메일 (유니크 제약)
	 private String memberEmail;

	 @Column(name = "loginid", nullable = false, unique = true, length = 50) // 로그인 ID (유니크 제약)
	 private String memberLoginId;

	 @Column(name = "password", nullable = false, length = 255) // 비밀번호 (암호화 후 저장)
	 private String memberPassword;

	 @Column(name = "phonenumber", length = 20) // 전화번호
	 private String memberPhoneNumber;

	 @Column(name = "address", length = 255) // 주소
	 private String memberAddress;

	 @Temporal(TemporalType.DATE) // 생년월일 (DATE 형식)
	 @Column(name = "dob")
	 private Date memberDob; // 생년월일

	 @Temporal(TemporalType.DATE) // 가입 날짜
	 @Column(name = "join_date", nullable = false)
	 private Date memberJoinDate; // 가입 날짜

	 @Lob // 프로필 이미지 (BLOB 타입)
	 @Column(name = "profile_image")
	 private byte[] memberProFileImage;

	 @Column(name = "sns_signup", nullable = false, length = 1) // SNS 가입 여부
	 private String memberSnsSignUp; // SNS 가입 여부 ('Y' 또는 'N')


}
