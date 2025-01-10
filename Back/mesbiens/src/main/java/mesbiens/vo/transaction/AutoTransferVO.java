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
@DiscriminatorValue("AUTOTRANSFER")
@Table(name = "autotransfer")
public class AutoTransferVO {

    @Column(nullable = false)
    private Timestamp transferDate; // 이체 날짜

  @ManyToOne
  @JoinColumn(
  		name = "sender_account_id", 
  		referencedColumnName = "accountNo"
  		) // 송신 계좌 외래키
  private AccountVO senderAccount; // 송신 계좌 참조

  @ManyToOne
  @JoinColumn(
  	name = "receiver_account_id",
  	referencedColumnName = "accountNo"
  	) // 수신 계좌 외래키
  private AccountVO receiverAccount; // 수신 계좌 참조

}