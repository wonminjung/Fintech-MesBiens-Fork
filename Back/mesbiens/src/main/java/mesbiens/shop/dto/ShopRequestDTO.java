package mesbiens.shop.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShopRequestDTO {
	
	// 결제 요청 DTO
    private int memberNo; // 결제할 회원 ID
    private int accountNo; // 결제할 계좌 ID
    private List<PurchaseItemDTO> purchaseList;

}
