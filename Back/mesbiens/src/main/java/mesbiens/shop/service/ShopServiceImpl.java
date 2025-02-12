package mesbiens.shop.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mesbiens.account.repository.AccountJpaRepository;
import mesbiens.account.vo.AccountVO;
import mesbiens.member.repository.MemberRepository;
import mesbiens.member.vo.MemberVO;
import mesbiens.shop.dao.CartDAO;
import mesbiens.shop.dao.ShopDAO;
import mesbiens.shop.dto.ShopDTO;
import mesbiens.shop.dto.ShopRequestDTO;
import mesbiens.shop.vo.CartVO;
import mesbiens.shop.vo.ShopVO;

@Service
public class ShopServiceImpl implements ShopService {
	
	@Autowired
	private ShopDAO shopDAO;
	
	@Autowired
	private CartDAO cartDAO;

	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private AccountJpaRepository accountRepository;
	
	@Override
	public Map<String, Object> getPurchaseList(ShopRequestDTO shopRequest) {
		// 회원 조회
        MemberVO member = memberRepository.findById(shopRequest.getMemberNo())
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));

        // Cart 테이블에서 구매 예정 목록 조회
        List<CartVO> cartItems = cartDAO.getCartByMember(member);

        // 전체 총 결제 금액 계산
        int grandTotal = cartItems.stream()
                .mapToInt(cart -> cart.getQuantity() * cart.getProduct().getProductPrice())
                .sum();
        
        // ShopDTO 리스트 생성
        List<ShopDTO> purchaseList = cartItems.stream()
                .map(cart -> {
                    ShopDTO dto = new ShopDTO();
                    dto.setMemberNo(member.getMemberNo());
                    dto.setMemberName(member.getMemberName());
                    dto.setProductNo(cart.getProduct().getProductNo());
                    dto.setProductName(cart.getProduct().getProductName());
                    dto.setQuantity(cart.getQuantity());
                    dto.setTotalPrice(cart.getQuantity() * cart.getProduct().getProductPrice());
                    return dto;
                })
                .collect(Collectors.toList());

        // 최종 응답 데이터 생성
        Map<String, Object> response = new HashMap<>();
        response.put("grandTotalPrice", grandTotal);
        response.put("purchaseList", purchaseList);

        return response;
	}

	@Override
	public void processPayment(ShopRequestDTO shopRequest) {
		// 회원 조회
        MemberVO member = memberRepository.findById(shopRequest.getMemberNo())
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));

        // 계좌 조회
        AccountVO account = accountRepository.findById(shopRequest.getAccountNo())
                .orElseThrow(() -> new IllegalArgumentException("해당 계좌가 존재하지 않습니다."));

        // 구매 목록 가져오기
        List<CartVO> cartItems = cartDAO.getCartByMember(member);
        
        if (cartItems.isEmpty()) {
            throw new IllegalArgumentException("장바구니에 상품이 없습니다.");
        }

        // 전체 결제 금액 계산
        int grandTotal = cartItems.stream()
                .mapToInt(cart -> cart.getQuantity() * cart.getProduct().getProductPrice())
                .sum();
        
        // ✅ 계좌 잔액 차감 로직 추가
        if (account.getAccountBalance() < grandTotal) {
            throw new IllegalArgumentException("잔액이 부족합니다.");
        }
        account.setAccountBalance(account.getAccountBalance() - grandTotal);
        accountRepository.save(account); // 변경된 잔액 저장

        // 결제 완료 처리 (장바구니 → 결제 테이블 이동)
        for (CartVO cart : cartItems) {
            ShopVO shop = new ShopVO();
            shop.setMember(member);
            shop.setAccount(account);
            shop.setProduct(cart.getProduct());
            shop.setQuantity(cart.getQuantity());
            shop.setTotalPrice(cart.getQuantity() * cart.getProduct().getProductPrice());
            shop.setBankName(account.getBankCode().getBankName());
            shop.setAccountNumber(account.getAccountNumber());

            shopDAO.savePayment(shop);
        }

        // 장바구니 비우기
        cartDAO.clearCart(member);
		
	}
}
