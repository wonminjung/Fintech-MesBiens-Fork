package mesbiens.vo.transaction;

import java.sql.Timestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@Entity
@ToString
@Table(name = "transactionlog")
public class TransactionLogVO {
    @Id
    @GeneratedValue(
    		strategy = GenerationType.SEQUENCE, 
    		generator = "transactionlog_seq_generator"
    		)
    @SequenceGenerator(
    		name = "transactionlog_seq_generator", 
    		sequenceName = "transactionlog_seq", 
    		allocationSize = 1
    		)
    private Long transactionlogId; // 로그 ID (Primary Key)

    @OneToOne
    @JoinColumn(
    		name = "transaction_id", 
    		referencedColumnName = "transactionId", 
    		nullable = false
    		) // TransactionVO와 1:1 관계
    private TransactionVO transaction; // 거래 정보

    @Column(nullable = false)
    private Double amount; // 거래 금액

    @Column(nullable = false)
    private Timestamp transactionDate; // 거래 날짜

    @Column(nullable = false)
    private String transactionStatus; // 거래 상태 (성공, 실패, 대기 등)

    @Column(nullable = true)
    private String description; // 거래 설명

    @Column(nullable = false, updatable = false)
    private Timestamp createdAt; // 로그 생성 시간 (DB에서 변경 불가)

    
}

