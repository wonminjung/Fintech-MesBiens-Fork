package mesbiens.vo.transaction;

import java.sql.Timestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@Entity
@ToString
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
@Table(name = "transaction")
public class TransactionVO {
	@Id
	@GeneratedValue(
			strategy = GenerationType.SEQUENCE, 
			generator = "transaction_seq_generator"
			)
	@SequenceGenerator(
			name = "transaction_seq_generator", // 시퀀스 제너레이터 이름
			sequenceName = "transaction_seq", // 실제 DB 시퀀스 이름
			allocationSize = 1 // 시퀀스 증가 단위
			)
	private Long transactionId; // 거래 ID (Primary Key) long

	@Column(nullable = false)
	private Double amount; // 거래 금액

	@Column(nullable = false)
	private Timestamp transactionDate; // 거래 날짜
	
    @Column(nullable = true)
    private String description; // 거래 설명
    
	@OneToOne(
			mappedBy = "transaction", 
			cascade = CascadeType.ALL
			)
	private TransactionLogVO transactionLog; // 거래 로그와 1:1 관계
}
