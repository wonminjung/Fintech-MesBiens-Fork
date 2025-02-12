package mesbiens.shop.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PurchaseItemDTO {
	private int productNo;      // 상품 번호
    private String productName; // 상품 이름
    private int productPrice;   // 상품 가격
    private int quantity;       // 구매 개수
}
