package mesbiens.transaction.vo;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "transaction_detail")
@SequenceGenerator(
	name = "transaction_no_seq_generator",
	sequenceName = "transaction_no_seq",
	initialValue = 1,
	allocationSize = 1
)
public class TransactionDetailVO {
	@Id
	@Column(name="TRANSACTION_no")
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "transaction_no_seq_generator"
	)
	private int transactionNo; // 거래내역No
	
	@ManyToOne
	@JoinColumn(name="receiver_account_no", referencedColumnName = "account_no")
	private AccountVO transactionReceiverAccountNo; // 수신 계좌
	
	@ManyToOne
	@JoinColumn(name="sender_account_no", referencedColumnName = "account_no")
	private AccountVO transactionSenderAccountNo; // 송신 계좌
	
	@ManyToOne
	@JoinColumn(name="consumption_cate_no", referencedColumnName = "consumption_cate_no")
	private ConsumptionCategoryVO consumptionCateNo; // 소비 카테고리 코드
	
	@Enumerated(EnumType.STRING) // Enum(상수) Class만 들어갈때 사용
	@Column(name="TRNS_type_name", nullable = false)
	private TransactionType transactionTypeName; // 거래 유형명
	
	
	@Column(name="TRNS_balance", nullable = false)
	private Long transactionBalance; // 거래 금액
	
	@Column(name="TRNS_place", nullable = false)
	private String transactionPlace; // 거래 점포
	
	@Column(name="TRNS_memo", nullable = false)
	private String transactionMemo; // 거래 메모
	
	@Column(name="TRNS_create_at")
	@CreationTimestamp
	private Timestamp transactionCreateAt; // 거래 시간
	
//	@Column(name="TRNS_cancel_YN", nullable = false, length = 1, columnDefinition = "string check (transactionCancelYN in ('Y', 'N'))")
	@Column(name="TRNS_cancel_YN", nullable = false, length = 1)
	private String transactionCancelYN; // 거래 취소 여부
	
	@Column(name="TRNS_update_at", nullable = false)
	@UpdateTimestamp
	private LocalDateTime transactionUpdateAt; // 거래 수정 시간
}





























