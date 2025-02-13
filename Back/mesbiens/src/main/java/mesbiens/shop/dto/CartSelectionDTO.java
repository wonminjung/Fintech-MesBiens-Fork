package mesbiens.shop.dto;

import lombok.Getter;
import lombok.Setter;
import mesbiens.shop.vo.CartVO;

@Setter
@Getter
public class CartSelectionDTO {
	private int cartNo;
    private int memberNo;
    private int productNo;
    private String productName;
    private int quantity;
    private int productPrice;
    private int totalPrice;
    private String productImageUrl;
    private String ischecked;

    // Entity → DTO 변환
    public static CartSelectionDTO fromEntity(CartVO cart) {
    	CartSelectionDTO dto = new CartSelectionDTO();
        dto.setCartNo(cart.getCartNo());
        dto.setMemberNo(cart.getMember().getMemberNo());
        dto.setProductNo(cart.getProduct().getProductNo());
        dto.setProductName(cart.getProduct().getProductName());
        dto.setQuantity(cart.getQuantity());
        dto.setProductPrice(cart.getProduct().getProductPrice());
        dto.setTotalPrice(cart.getTotalPrice());
        dto.setProductImageUrl(cart.getProduct().getProductImageUrl());
        dto.setIschecked(cart.getIschecked());
        return dto;
    }
}
