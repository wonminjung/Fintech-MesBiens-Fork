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
@DiscriminatorValue("DEPOSIT")
@Table(name = "deposit")
public class DepositVO extends TransactionVO {

    @ManyToOne
    @JoinColumn(
    		name = "account_id", 
    		referencedColumnName = "accountNo"
    		)
    private AccountVO account; // 계좌 테이블과 N:1 관계    수신 계좌 저장 필요

}