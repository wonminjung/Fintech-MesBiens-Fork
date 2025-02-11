package mesbiens.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mesbiens.member.vo.MemberVO;
import mesbiens.shop.dto.CartRequestDTO;
import mesbiens.shop.service.CartService;

@RestController
@RequestMapping("/shop/cart")
public class CartController {
	
	@Autowired
	private CartService cartService;
	
	// 장바구니에 상품 추가
    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody CartRequestDTO cartRequestDTO) 
    {
        MemberVO member = new MemberVO();
        member.setMemberNo(cartRequestDTO.getMemberNo());
        
        cartService.addToCart(member, cartRequestDTO.getProductNo(), cartRequestDTO.getQuantity());
        return ResponseEntity.ok("상품이 장바구니에 추가되었습니다.");
    }

    // 장바구니 조회
    @GetMapping("/{memberNo}")
    public ResponseEntity<List<CartRequestDTO>> getCart(@PathVariable(name = "memberNo") int memberNo) {
        MemberVO member = new MemberVO();
        member.setMemberNo(memberNo);
        
        List<CartRequestDTO> cartItems = cartService.getCartByMember(member);
        return ResponseEntity.ok(cartItems);
    }

    // 장바구니 아이템 삭제
    @DeleteMapping("/remove/{cartNo}")
    public ResponseEntity<String> removeCartItem(@PathVariable(name = "cartNo") int cartNo) {
        cartService.removeCartItem(cartNo);
        return ResponseEntity.ok("상품이 장바구니에서 삭제되었습니다.");
    }

    // 장바구니 전체 삭제
    @DeleteMapping("/clear/{memberNo}")
    public ResponseEntity<String> clearCart(@PathVariable(name = "memberNo") int memberNo) {
        MemberVO member = new MemberVO();
        member.setMemberNo(memberNo);

        cartService.clearCart(member);
        return ResponseEntity.ok("장바구니가 비워졌습니다.");
    }
}
