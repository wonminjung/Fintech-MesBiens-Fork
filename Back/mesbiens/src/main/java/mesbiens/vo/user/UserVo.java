package mesbiens.vo.user;



import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="user")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "userNo")
@SequenceGenerator(
	name = "user_no_seq_generator",
	sequenceName = "user_no_seq",
	initialValue = 1,
	allocationSize = 1
)
public class UserVo {
	
	@Id
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "user_no_seq_generator"
	)
	@Column(name = "userNo") // 회원 아이디 (Primary Key)
	private int userNo;
	
	@Column(name = "userName", nullable = false, length = 100) // 회원 이름
	private String userName;
	
	@Column(name = "userEmail", nullable = false, unique = true, length = 255) // 이메일 (유니크 제약)
	private String userEmail;
	
	@Column(name = "userId", nullable = false, unique = true, length = 50) // 로그인 ID (유니크 제약)
	private String userId;
	
	@Column(name = "userPassword", nullable = false, length = 255) // 비밀번호 (암호화 후 저장)
	private String userPassword;
	
	@Column(name = "userPhone", length = 20) // 전화번호
	private String userPhone;
	
	@Column(name = "userAddress", length = 255) // 주소
	private String userAddress;
	
	@Column(name = "userBirth") // 생년월일
	private String userBirth; 
	
	@CreationTimestamp
	@Column(name = "userCreateAt", nullable = false) // 가입 날짜
	private Timestamp userCreateAt; 
	
	@Column(name = "userProfile") // 유저 프로필
	private String userProfile;
	
	@Column(name = "userSnsSignUpYN", nullable = false, length = 1) // SNS 가입 여부 ('Y' 또는 'N')
	private String userSnsSignUpYN; 


}
