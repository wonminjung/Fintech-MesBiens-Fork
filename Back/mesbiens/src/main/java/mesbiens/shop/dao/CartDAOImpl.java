package mesbiens.shop.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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

	@Override
	public List<CartVO> getCartByMember(MemberVO member) {
		return cartRepository.findByMember(member);
	}

	@Override
	public void removeCartItem(int cartNo) {
		cartRepository.deleteById(cartNo);
		
	}

	@Override
	public void clearCart(MemberVO member) {
		List<CartVO> cartItems = cartRepository.findByMember(member);
        cartRepository.deleteAll(cartItems);
		
	}
	
}
