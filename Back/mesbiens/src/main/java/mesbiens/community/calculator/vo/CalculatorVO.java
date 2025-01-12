package mesbiens.community.calculator.vo;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import mesbiens.account.vo.AccountVO;

// 예금 이자 계산기 Entity Bean 클래스

@Setter
@Getter
@ToString
@EqualsAndHashCode(of = "calculatorNo")
@Entity
@Table(name = "calculator")
@SequenceGenerator(
	name = "calculator_no_seq_generator",
	sequenceName = "calculator_no_seq",
	initialValue = 1,
	allocationSize = 1
)
public class CalculatorVO {
	@Id
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "calculator_no_seq_generator"
	)
	private int calculatorNo; // 예금 이자 계산 식별키 
	
	@OneToOne
	@JoinColumn(referencedColumnName="accountNo")
	private AccountVO accountNo; // 계좌 식별키
	
	@Column(nullable = false)
	private Long principal; // 원금
	
	@Column(nullable = false)
	private int interestedRate; // 이자율
	
	@Column(nullable = false)
	private int durationMonths; // 기간(월 단위)
	
	@Column(nullable = false)
	private Long calculatedAmount; // 계산된 금액 
	
	
}













