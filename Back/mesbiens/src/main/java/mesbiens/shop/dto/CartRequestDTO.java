package mesbiens.shop.dto;

import lombok.Getter;
import lombok.Setter;
import mesbiens.shop.vo.CartVO;

@Getter
@Setter
public class CartRequestDTO {
    private int cartNo;
    private int memberNo;
    private int productNo;
    private String productName;
    private int quantity;
    private int productPrice;
    private int totalPrice;
    private String productImageUrl;

    // Entity → DTO 변환
    public static CartRequestDTO fromEntity(CartVO cart) {
        CartRequestDTO dto = new CartRequestDTO();
        dto.setCartNo(cart.getCartNo());
        dto.setMemberNo(cart.getMember().getMemberNo());
        dto.setProductNo(cart.getProduct().getProductNo());
        dto.setProductName(cart.getProduct().getProductName());
        dto.setQuantity(cart.getQuantity());
        dto.setProductPrice(cart.getProduct().getProductPrice());
        dto.setTotalPrice(cart.getTotalPrice());
        dto.setProductImageUrl(cart.getProduct().getProductImageUrl());
        return dto;
    }
}
