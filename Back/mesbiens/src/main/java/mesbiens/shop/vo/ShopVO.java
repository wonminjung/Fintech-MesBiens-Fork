package mesbiens.shop.vo;

import jakarta.persistence.Column;
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
import mesbiens.account.vo.AccountVO;
import mesbiens.member.vo.MemberVO;

@Setter
@Getter
@ToString
@Entity
@SequenceGenerator(
		name="shop_no_seq_shop",
		sequenceName = "shop_no_seq", // 시퀀스 이름
		initialValue = 1, // 시작값
		allocationSize = 1 // 증가값
	)
@Table(name="shop")
@EqualsAndHashCode(of="shopNo")
public class ShopVO {
	
	@Id
	@Column(name="shop_no")
	@GeneratedValue(
			strategy = GenerationType.SEQUENCE, // 사용할 전략을 시퀀스로 선택
			generator = "shop_no_seq_shop" // 시퀀스 생성기에 설정해 놓은 제너레이터 이름
			)
	private int shopNo;
	
	@ManyToOne
    @JoinColumn(name="member_no", referencedColumnName = "member_no", nullable = false)
    private MemberVO member; // 결제자 (회원 정보)

    @ManyToOne
    @JoinColumn(name="account_no", referencedColumnName = "account_no", nullable = false)
    private AccountVO account; // 결제 계좌

    @ManyToOne
    @JoinColumn(name="product_no", referencedColumnName = "product_no", nullable = false)
    private ProductVO product; // 구매 상품

    @Column(name="quantity", nullable = false)
    private int quantity; // 구매 수량

    @Column(name="total_price", nullable = false)
    private int totalPrice; // 총 결제 금액

    @Column(name="bank_name", nullable = false)
    private String bankName; // 은행 이름

    @Column(name="account_number", nullable = false)
    private String accountNumber; // 결제 계좌 번호

    // 계좌 정보 업데이트 (AccountVO에서 가져와서 자동 설정)
    public void updateAccountInfo() {
        if (account != null) {
            this.bankName = account.getBankCode().getBankName(); // BankInfoVO의 은행명
            this.accountNumber = account.getAccountNumber();
        }
    }
	
}
