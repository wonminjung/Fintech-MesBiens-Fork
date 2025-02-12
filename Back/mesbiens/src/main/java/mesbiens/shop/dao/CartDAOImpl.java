package mesbiens.shop.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import mesbiens.member.vo.MemberVO;
import mesbiens.shop.repository.CartRepository;
import mesbiens.shop.repository.ProductRepository;
import mesbiens.shop.repository.ShopRepository;
import mesbiens.shop.vo.CartVO;
import mesbiens.shop.vo.ProductVO;

@Repository
public class CartDAOImpl implements CartDAO {
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private ShopRepository shopRepository;

	@Override
	public ProductVO findById(int productNo) {
		return productRepository.findById(productNo)
        .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));
	}

	@Override
	public void addToCart(CartVO cartItem) {
		cartRepository.save(cartItem);
		
	}

	// 장바구니 추가시 기존물품 있으면 수량만 증가
	@Override
	public CartVO findByMemberAndProduct(MemberVO member, ProductVO product) {
		return cartRepository.findByMemberAndProduct(member, product);
	}
	
	
	@Override
	public List<CartVO> getCartByMember(MemberVO member) {
		return cartRepository.findByMember(member);
	}

	@Transactional
	@Override
	public void removeCartItem(int cartNo) {
		cartRepository.deleteById(cartNo);
		
	}

	@Override
	public void clearCart(MemberVO member) {
		List<CartVO> cartItems = cartRepository.findByMember(member);
        cartRepository.deleteAll(cartItems);
		
	}

	@Override
	public void delete(CartVO cart) {
		cartRepository.delete(cart);
	}

	@Override
	public void updateQuantity(CartVO cart) {
		if (cart.getQuantity() > 0) {
	        cartRepository.save(cart); // 수량이 남아 있으면 업데이트
	    } else {
	        cartRepository.delete(cart); // 수량이 0이면 삭제
	    }
		
	}
	
}
