package mesbiens.shop.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mesbiens.account.dto.AccountResponseDTO;
import mesbiens.account.repository.AccountJpaRepository;
import mesbiens.account.vo.AccountVO;
import mesbiens.member.repository.MemberRepository;
import mesbiens.member.vo.MemberVO;
import mesbiens.shop.dao.CartDAO;
import mesbiens.shop.dao.ShopDAO;
import mesbiens.shop.dto.PurchaseItemDTO;
import mesbiens.shop.dto.ShopDTO;
import mesbiens.shop.dto.ShopRequestDTO;
import mesbiens.shop.repository.ProductRepository;
import mesbiens.shop.vo.CartVO;
import mesbiens.shop.vo.ProductVO;
import mesbiens.shop.vo.ShopVO;

@Service
public class ShopServiceImpl implements ShopService {
	
	@Autowired
	private ShopDAO shopDAO;
	
	@Autowired
	private CartDAO cartDAO;
	
	@Autowired
	private ProductRepository productRepository;

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

	@Transactional
	@Override
	public void processPayment(ShopRequestDTO shopRequest) {
		// 회원 조회
        MemberVO member = memberRepository.findById(shopRequest.getMemberNo())
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));

        // 계좌 조회
        AccountVO account = accountRepository.findById(shopRequest.getAccountNo())
                .orElseThrow(() -> new IllegalArgumentException("해당 계좌가 존재하지 않습니다."));

        // 구매 목록 가져오기
        List<PurchaseItemDTO> purchaseList = shopRequest.getPurchaseList();
        
        if (purchaseList.isEmpty()) {
            throw new IllegalArgumentException("장바구니에 상품이 없습니다.");
        }

        // 전체 결제 금액 계산
        int grandTotal = purchaseList.stream()
                .mapToInt(item -> item.getQuantity() * item.getProductPrice())
                .sum();
        
        // ✅ 잔액 확인
        if (account.getAccountBalance() < grandTotal) {
            throw new IllegalArgumentException("잔액이 부족합니다.");
        }
        
        // ✅ 재고 확인 및 감소
        for (PurchaseItemDTO item : purchaseList) {
            ProductVO product = productRepository.findById(item.getProductNo())
                    .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다."));

            if (product.getProductStock() < item.getQuantity()) {
                throw new IllegalArgumentException("재고 부족: " + product.getProductName());
            }

            product.setProductStock(product.getProductStock() - item.getQuantity());
            productRepository.save(product);
        }
        
        // ✅ 계좌 잔액 차감
        account.setAccountBalance(account.getAccountBalance() - grandTotal);
        accountRepository.save(account);

     // ✅ 장바구니에서 구매한 개수만큼 차감
        for (PurchaseItemDTO item : purchaseList) {
        	ProductVO product = productRepository.findById(item.getProductNo())
        	        .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다."));
        	
            CartVO cart = cartDAO.findByMemberAndProduct(member, product);
                    

            int newQuantity = cart.getQuantity() - item.getQuantity();

            System.out.println("🛒 기존 장바구니 수량: " + cart.getQuantity());
            System.out.println("🛍 구매한 수량: " + item.getQuantity());
            System.out.println("📉 남아야 할 수량: " + newQuantity);

            
            if (newQuantity > 0) {
                cart.setQuantity(newQuantity);
                System.out.println("✅ 업데이트할 장바구니 수량: " + cart.getQuantity());
                cartDAO.updateQuantity(cart); // ✅ 개수만 수정
            } else {
            	System.out.println("🗑 장바구니에서 상품 삭제: " + cart.getProduct().getProductName());
                cartDAO.delete(cart); // ✅ 개수가 0이면 삭제
            }
        }

        // ✅ 결제 내역 저장 (주문 테이블에 저장)
        for (PurchaseItemDTO item : purchaseList) {
            ShopVO shop = new ShopVO();
            shop.setMember(member);
            shop.setAccount(account);
            shop.setProduct(productRepository.findById(item.getProductNo())
                    .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다.")));
            shop.setQuantity(item.getQuantity());
            shop.setTotalPrice(item.getQuantity() * item.getProductPrice());
            shop.setBankName(account.getBankCode().getBankName());
            shop.setAccountNumber(account.getAccountNumber());

            shopDAO.savePayment(shop);
        }

        // 장바구니 비우기
        cartDAO.clearCart(member);
		
	}

	@Override
	public List<AccountResponseDTO> getAccountsByMember(int memberNo) {
		
		MemberVO member = memberRepository.findById(memberNo)
				.orElseThrow(() -> new RuntimeException("회원 정보를 찾을 수 없습니다"));
		
		return accountRepository.findByMemberNo(member)
				.stream()
				.map(AccountResponseDTO::new)
				.collect(Collectors.toList());
	}
}
