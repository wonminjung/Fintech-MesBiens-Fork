package mesbiens.shop.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mesbiens.member.repository.MemberRepository;
import mesbiens.member.vo.MemberVO;
import mesbiens.shop.dao.CartDAO;
import mesbiens.shop.dto.CartRequestDTO;
import mesbiens.shop.repository.CartRepository;
import mesbiens.shop.repository.ProductRepository;
import mesbiens.shop.vo.CartVO;
import mesbiens.shop.vo.ProductVO;

@Service
public class CartServiceImpl implements CartService {
	
	@Autowired
	private CartDAO cartDAO;
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private ProductRepository productRepository;

	// 장바구니 상품 추가
	@Override
	public void addToCart(int memberNo, int productNo, int quantity) {
		// DB에서 Member 조회
        MemberVO member = memberRepository.findById(memberNo)
            .orElseThrow(() -> new RuntimeException("해당 회원을 찾을 수 없습니다: " + memberNo)); 
		
        ProductVO product = productRepository.findById(productNo)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다: " + productNo));
	    
        // ✅ 기존 장바구니에서 같은 상품이 있는지 조회
        CartVO existingCartItem = cartDAO.findByMemberAndProduct(member, product);
        
        if (existingCartItem != null) {
            // 같은 상품이 이미 있으면 `quantity`만 증가
            existingCartItem.setQuantity(existingCartItem.getQuantity() + quantity);
            cartDAO.addToCart(existingCartItem);
        } else {
            // 같은 상품이 없으면 새로운 장바구니 항목 추가
            CartVO cartItem = new CartVO();
            cartItem.setMember(member);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartDAO.addToCart(cartItem);
        }

		
	}

	// 장바구니 조회
	@Override
	public List<CartRequestDTO> getCartByMember(int memberNo) {
		
		// 회원 정보 확인 (없으면 예외 발생)
        MemberVO member = memberRepository.findById(memberNo)
            .orElseThrow(() -> new RuntimeException("해당 회원을 찾을 수 없습니다: " + memberNo));

		
		List<CartVO> carts = cartDAO.getCartByMember(member);
		return carts.stream()
                .map(CartRequestDTO::fromEntity)
                .collect(Collectors.toList());
	}

	// 장바구니 삭제
	@Transactional
	@Override
	public void removeCartItem(int cartNo) {
		cartDAO.removeCartItem(cartNo);
		
	}

	// 장바구니 전체 삭제
	@Override
	public void clearCart(MemberVO member) {
		cartDAO.clearCart(member);
		
	}

	@Transactional
    @Override
    public void updateCartSelection(int memberNo, int productNo, String ischecked) {

        // 회원 조회
        MemberVO member = memberRepository.findById(memberNo)
            .orElseThrow(() -> new RuntimeException("해당 회원을 찾을 수 없습니다: " + memberNo));

        // 상품 조회
        ProductVO product = productRepository.findById(productNo)
            .orElseThrow(() -> new RuntimeException("해당 상품을 찾을 수 없습니다: " + productNo));

        // 장바구니 아이템 조회
        CartVO cartItem = cartRepository.findByMemberAndProduct(member, product);

        if (cartItem != null) {
            cartItem.setIschecked(ischecked); // 체크 상태 업데이트
            cartRepository.save(cartItem);
        } else {
            throw new RuntimeException("장바구니에 해당 상품이 존재하지 않습니다.");
        }
    }

	@Transactional
	@Override
	public void updateCartQuantity(int cartNo, int quantity) {
	    CartVO cartItem = cartRepository.findById(cartNo)
	        .orElseThrow(() -> new RuntimeException("장바구니 아이템을 찾을 수 없습니다: " + cartNo));

	    cartItem.setQuantity(quantity);
	    cartRepository.save(cartItem);
	}
}
