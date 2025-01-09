package mesbiens.vo.transaction;

import java.sql.Timestamp;

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
@DiscriminatorValue("REGUIARPAYMENT")
@Table(name = "regular_payment")
public class RegularPaymentVO extends TransactionVO {

    @Column(nullable = false)
    private Timestamp startDate; // 정기결제 시작 날짜

    @Column(nullable = false)
    private Timestamp frequency; // 정기결제 주기 (예: 매달, 매주 등)
    
    @Column(nullable = false)
    private Timestamp duedate; //결제일

    @ManyToOne
    @JoinColumn(
          name = "account_id", 
          referencedColumnName = "accountNo"
    		)
    private AccountVO account; // 계좌 테이블과 N:1 관계
}

