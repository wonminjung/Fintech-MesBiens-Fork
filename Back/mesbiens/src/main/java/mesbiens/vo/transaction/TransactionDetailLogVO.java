package mesbiens.vo.transaction;

import jakarta.persistence.Entity;
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
@Table(name = "transationlog")
@SequenceGenerator(
	name = "transactionlog_no_seq_generator",
	sequenceName = "transactionlog_no_seq",
	initialValue = 1,
	allocationSize = 1
)
public class TransactionDetailLogVO {
	@Id
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "transactionlog_no_seq_generator"
	)
	private int transactionLogNo; // 거래 로그 No.
	
	@ManyToOne
	@JoinColumn(referencedColumnName = "transactionDetailNo")
	private TransactionDetailVO transactionDetailNo; // 거래 내역 No.
	
	
}
