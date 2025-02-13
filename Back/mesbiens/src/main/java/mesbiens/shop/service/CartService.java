package mesbiens.shop.service;

import java.util.List;

import mesbiens.member.vo.MemberVO;
import mesbiens.shop.dto.CartRequestDTO;

public interface CartService {

	void addToCart(int memberNo, int productNo, int quantity);

	List<CartRequestDTO> getCartByMember(int memberNo);

	void removeCartItem(int cartNo);

	void clearCart(MemberVO member);

	void updateCartSelection(int memberNo, int productNo, String ischecked);

	void updateCartQuantity(int cartNo, int quantity);


}
