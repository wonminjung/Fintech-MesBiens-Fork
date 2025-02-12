package mesbiens.shop.dao;

import java.util.List;

import mesbiens.member.vo.MemberVO;
import mesbiens.shop.vo.CartVO;
import mesbiens.shop.vo.ProductVO;

public interface CartDAO {

	ProductVO findById(int productNo);

	void addToCart(CartVO cartItem);

	List<CartVO> getCartByMember(MemberVO member);

	void removeCartItem(int cartNo);

	void clearCart(MemberVO member);
	
}
