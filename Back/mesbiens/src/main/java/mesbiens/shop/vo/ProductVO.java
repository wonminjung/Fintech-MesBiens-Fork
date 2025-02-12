package mesbiens.shop.vo;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
@Table(name = "product")
@SequenceGenerator(
        name = "product_no_seq_generator",
        sequenceName = "product_no_seq",
        initialValue = 1,
        allocationSize = 1
)
@EqualsAndHashCode(of = "productNo")
public class ProductVO {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "product_no_seq_generator"
    )
    @Column(name = "product_no")
    private int productNo; // 상품 고유번호

    @Column(name = "product_name", nullable = false)
    private String productName; // 상품명

    @Column(name = "product_price", nullable = false)
    private int productPrice; // 상품 가격

    @Column(name = "product_category", nullable = false)
    private String productCategory; // 상품 카테고리 (예: 음료, 화장품, 향수 등)

    @Column(name = "product_description")
    private String productDescription; // 상품 설명

    @Column(name = "product_image_url", nullable = false)
    private String productImageUrl; // 상품 이미지 URL

//    @Column(name = "product_stock", nullable = false)
//    private int productStock; // 상품 재고량
}
