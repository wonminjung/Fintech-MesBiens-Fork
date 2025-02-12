package mesbiens.shop.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
import mesbiens.member.vo.MemberVO;

@Setter
@Getter
@ToString
@Entity
@Table(name = "cart")
@SequenceGenerator(
        name = "cart_no_seq_generator",
        sequenceName = "cart_no_seq",
        initialValue = 1,
        allocationSize = 1
)
@EqualsAndHashCode(of = "cartNo")
public class CartVO {

    @Id
    @GeneratedValue(
    		strategy = GenerationType.SEQUENCE, 
    		generator = "cart_no_seq_generator")
    @Column(name = "cart_no")
    private int cartNo; // 장바구니 ID

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_no", referencedColumnName = "member_no", nullable = false)
    private MemberVO member; // 장바구니 소유자

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_no", referencedColumnName = "product_no", nullable = false)
    private ProductVO product; // 장바구니에 담긴 상품

    @Column(name = "quantity", nullable = false)
    private int quantity; // 상품 개수
    
    private String ischecked; // 장바구니 상품체크 여부

    // 총 금액 계산
    public int getTotalPrice() {
        return product.getProductPrice() * quantity;
    }
}
