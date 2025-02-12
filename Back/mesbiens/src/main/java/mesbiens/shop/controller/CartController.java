package mesbiens.shop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mesbiens.member.vo.MemberVO;
import mesbiens.shop.dto.CartRequestDTO;
import mesbiens.shop.dto.CartSelectionDTO;
import mesbiens.shop.dto.CartUpdateDTO;
import mesbiens.shop.service.CartService;

@RestController
@RequestMapping("/shop")
@CrossOrigin(origins = "http://localhost:4000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH, RequestMethod.DELETE})
public class CartController {

	
	@Autowired
	private CartService cartService;
	
	// 장바구니에 상품 추가
    @PostMapping("/Cart/add")
    public ResponseEntity<String> addToCart(@RequestBody CartRequestDTO cartRequestDTO) 
    {
        cartService.addToCart(cartRequestDTO.getMemberNo(), cartRequestDTO.getProductNo(), cartRequestDTO.getQuantity());
        System.out.println("추가 실행되고있나요");
        return ResponseEntity.ok("상품이 장바구니에 추가되었습니다.");
    }

    // 장바구니 조회
    @GetMapping("/Cart")
    public ResponseEntity<List<CartRequestDTO>> getCart(@RequestParam(value = "memberNo") int memberNo) {
        
        List<CartRequestDTO> cartItems = cartService.getCartByMember(memberNo);
        return ResponseEntity.ok(cartItems);
    }

    // 장바구니 아이템 삭제
    @DeleteMapping("/Cart/remove/{cartNo}")
    public ResponseEntity<String> removeCartItem(@PathVariable(name = "cartNo") int cartNo) {
        cartService.removeCartItem(cartNo);
        return ResponseEntity.ok("상품이 장바구니에서 삭제되었습니다.");
    }

    // 장바구니 전체 삭제
    @DeleteMapping("/Cart/clear/{memberNo}")
    public ResponseEntity<String> clearCart(@PathVariable(name = "memberNo") int memberNo) {
        MemberVO member = new MemberVO();
        member.setMemberNo(memberNo);

        cartService.clearCart(member);
        return ResponseEntity.ok("장바구니가 비워졌습니다.");
    }
    
    // 장바구니 선택 여부 확인
    @PatchMapping("/cart/select")
    public ResponseEntity<String> updateCartSelection(@RequestBody CartSelectionDTO cartSelectionDTO) {

     // 인스턴스를 통해 값 가져오기
        cartService.updateCartSelection(
            cartSelectionDTO.getMemberNo(), 
            cartSelectionDTO.getProductNo(), 
            cartSelectionDTO.getIschecked()
        );

        return ResponseEntity.ok("장바구니 체크 상태 업데이트 완료");
    }
    
    // 장바구니 상품 수량 변경
    @PatchMapping("/Cart/updateQuantity")
    public ResponseEntity<String> updateCartQuantity(@RequestBody CartUpdateDTO cartUpdateDTO) {
        cartService.updateCartQuantity(cartUpdateDTO.getCartNo(), cartUpdateDTO.getQuantity());
        return ResponseEntity.ok("장바구니 수량이 변경되었습니다.");
    }
}
