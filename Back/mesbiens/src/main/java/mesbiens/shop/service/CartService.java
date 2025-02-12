package mesbiens.shop.service;

import java.util.List;

import mesbiens.member.vo.MemberVO;
import mesbiens.shop.dto.CartRequestDTO;

public interface CartService {

	void addToCart(MemberVO member, int productNo, int quantity);

	List<CartRequestDTO> getCartByMember(MemberVO member);

	void removeCartItem(int cartNo);

	void clearCart(MemberVO member);

}
