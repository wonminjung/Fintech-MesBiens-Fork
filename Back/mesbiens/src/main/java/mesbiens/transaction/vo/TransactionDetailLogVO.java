package mesbiens.transaction.vo;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

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

// 거래 로그 Entity Bean 클래스

@Setter
@Getter
@ToString
@EqualsAndHashCode(of = "transactionLogNo")
@Entity
@Table(name = "transaction_detail_log")
@SequenceGenerator(
	name = "transactionlog_no_seq_generator",
	sequenceName = "transactionlog_no_seq",
	initialValue = 1,
	allocationSize = 1
)
public class TransactionDetailLogVO {
	@Id
	@Column(name="TRANSACTION_log_no")
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "transactionlog_no_seq_generator"
	)
	private int transactionLogNo; // 거래 로그 No.
	
	@ManyToOne
	@JoinColumn(name="TRNS_no", referencedColumnName = "transaction_no")
	private TransactionDetailVO transactionNo; // 거래 내역 No.
	
	@Enumerated(EnumType.STRING)
	@Column(name="TRNS_log_type", nullable = false)
	private TransactionLogType transactionLogType; // 거래 로그 상태
	
	@Column(name="TRNS_log_create_at")
	@CreationTimestamp
	private Timestamp transactionLogCreateAt; // 로그 생성 시간
	
}
