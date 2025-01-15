package mesbiens.account.vo;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import mesbiens.member.vo.MemberVO;

// 계좌 Entity Bean 클래스

@Setter
@Getter
@ToString
@Entity
@Table(name = "account")
@SequenceGenerator(
	name = "account_no_seq_generator",
	sequenceName = "account_no_seq",
	initialValue = 1,
	allocationSize = 1
)
@EqualsAndHashCode(of = "accountNo")
public class AccountVO {
	@Id
	@Column(name="account_no")
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "account_no_seq_generator"
	)
	private int accountNo;
	
	@ManyToOne
	@JoinColumn(name = "member_no", referencedColumnName = "member_no")
	private MemberVO memberNo; // 회원 No
	
	@ManyToOne
	@JoinColumn(name = "bank_code", referencedColumnName = "bank_code")
	private BankInfoVO bankCode; // 은행 코드
	
	@Column(name="ACCT_number", nullable = false, unique = true)
	private String accountNumber; // 계좌 번호
	
	@Column(name="ACCT_balance", nullable = false)
	private Long accountBalance; // 계좌 잔액
	
	// 계좌 잔액 기본값 0 들어가는 메소드
	@PrePersist
	public void setDefaultBalanace() {
		if(this.accountBalance == null) {
			this.accountBalance = 0L;
		}
	}
	
	@Column(name="ACCT_password", nullable = false)
	private String accountPassword; // 계좌 비밀번호
	
	@CreationTimestamp
	@Column(name="ACCT_opening_date")
	private Timestamp accountOpeningDate; // 계좌 개설일
	
}







