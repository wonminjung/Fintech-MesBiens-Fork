package mesbiens.vo.transaction;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import mesbiens.vo.account.AccountVO;

@Getter
@Setter
@Entity
@DiscriminatorValue("PAYMENT")
@Table(name = "payment")
public class PaymentVO extends TransactionVO {

//    @Column(nullable = false, length = 100)
//    private String paymentMethod; // 결제 방식 (예: 카드, 계좌이체 등)
    
    @Column(nullable = false, length = 50)
    private String paymentStatus; // 결제 상태 (성공, 실패 등)

    @ManyToOne
    @JoinColumn(
          name = "account_id", 
          referencedColumnName = "accountNo"
    )
    private AccountVO account; // 계좌 테이블과 N:1 관계
}




