package mesbiens.shop.dto;

import lombok.Getter;
import lombok.Setter;
import mesbiens.shop.vo.ShopVO;

@Getter
@Setter
public class ShopDTO {
	// 구매목록 반환 DTO
    private int shopNo; // 상점No
    private int memberNo; // 회원No
    private String memberName; // 회원이름
    private int accountNo; // 계좌No
    private String bankName; // 은행이름
    private String accountNumber; // 계좌번호
    private int productNo; // 제품No
    private String productName; // 제품 이름
    private int quantity; // 제품 수량
    private int totalPrice; // 한 품목 총액
//    private int grandTotalPrice; // 전체 품목 총액

    public static ShopDTO fromEntity(ShopVO shop) {
        ShopDTO dto = new ShopDTO();
        dto.setShopNo(shop.getShopNo());
        dto.setMemberNo(shop.getMember().getMemberNo());
        dto.setMemberName(shop.getMember().getMemberName());
        dto.setAccountNo(shop.getAccount().getAccountNo());
        dto.setBankName(shop.getBankName());
        dto.setAccountNumber(shop.getAccountNumber());
        dto.setProductNo(shop.getProduct().getProductNo());
        dto.setProductName(shop.getProduct().getProductName());
        dto.setQuantity(shop.getQuantity());
        dto.setTotalPrice(shop.getTotalPrice());
        return dto;
    }
}
