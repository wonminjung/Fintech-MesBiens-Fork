package mesbiens.shop.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mesbiens.member.vo.MemberVO;
import mesbiens.shop.dao.CartDAO;
import mesbiens.shop.dto.CartRequestDTO;
import mesbiens.shop.vo.CartVO;
import mesbiens.shop.vo.ProductVO;

@Service
public class CartServiceImpl implements CartService {
	
	@Autowired
	private CartDAO cartDAO;

	// 장바구니 상품 추가
	@Override
	public void addToCart(MemberVO member, int productNo, int quantity) {
		 ProductVO product = cartDAO.findById(productNo);
	        
	        CartVO cartItem = new CartVO();
	        cartItem.setMember(member);
	        cartItem.setProduct(product);
	        cartItem.setQuantity(quantity);

	        cartDAO.addToCart(cartItem);
		
	}

	// 장바구니 조회
	@Override
	public List<CartRequestDTO> getCartByMember(MemberVO member) {
		List<CartVO> carts = cartDAO.getCartByMember(member);
		return carts.stream()
                .map(CartRequestDTO::fromEntity)
                .collect(Collectors.toList());
	}

	// 장바구니 삭제
	@Override
	public void removeCartItem(int cartNo) {
		cartDAO.removeCartItem(cartNo);
		
	}

	// 장바구니 전체 삭제
	@Override
	public void clearCart(MemberVO member) {
		cartDAO.clearCart(member);
		
	}
}
