package mesbiens.transaction.vo;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import mesbiens.account.vo.AccountVO;

// 거래 내역 Entity Bean 클래스

@Setter
@Getter
@ToString
@EqualsAndHashCode(of = "transactionNo")
@Entity
@Table(name =  "transactionDetail")
@SequenceGenerator(
	name = "transactiondetail_no_seq_generator",
	sequenceName = "transactiondetail_no_seq",
	initialValue = 1,
	allocationSize = 1
)
public class TransactionDetailVO {
	@Id
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "transactiondetail_no_seq_generator"
	)
	private int transactionNo; // 거래내역No
	
	@ManyToOne
	@JoinColumn(referencedColumnName = "accountNo")
	private AccountVO transactionReceiverAccountNo; // 수신 계좌
	
	@ManyToOne
	@JoinColumn(referencedColumnName = "accountNo")
	private AccountVO transactionSenderAccountNo; // 송신 계좌
	
	@OneToOne
	@JoinColumn(referencedColumnName = "consumptionCateCode")
	private ConsumptionCategoryVO consumptionCateCode; // 소비 카테고리 코드
	
	@Column(nullable = false)
	private TransactionType transactionTypeName; // 거래 유형명
	
	@Column(nullable = false)
	private Long transactionBalance; // 거래 금액
	
	@Column(nullable = false)
	private String transactionPlace; // 거래 점포
	
	@Column(nullable = false)
	private String transactionMemo; // 거래 메모
	
	@CreationTimestamp
	private Timestamp transactionCreateAt; // 거래 시간
	
	@Column(nullable = false, length = 1, columnDefinition = "char(1) check (status in ('Y', 'N'))")
	private char transactionCancelYN; // 거래 취소 여부
	
	@Column(nullable = false)
	@UpdateTimestamp
	private LocalDateTime transactionUpdateAt; // 거래 수정 시간
}





























