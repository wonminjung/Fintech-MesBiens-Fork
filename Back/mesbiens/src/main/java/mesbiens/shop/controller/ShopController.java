package mesbiens.shop.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mesbiens.account.dto.AccountResponseDTO;
import mesbiens.shop.dto.ShopRequestDTO;
import mesbiens.shop.service.ShopService;

@RestController
@RequestMapping("/shop")
public class ShopController {
	
	@Autowired
	private ShopService shopService;
	
	// 결제 전 구매 목록 조회
	@PostMapping("/purchase")
	public ResponseEntity<Map<String, Object>> getPurchaseList(@RequestBody ShopRequestDTO shopRequest) {
	    Map<String, Object> response = shopService.getPurchaseList(shopRequest);
	    return ResponseEntity.ok(response);
	}

    // 결제 처리
    @PostMapping("/purchase_ok")
    public ResponseEntity<String> processPayment(@RequestBody ShopRequestDTO shopRequest) {
        shopService.processPayment(shopRequest);
        return ResponseEntity.ok("결제가 완료되었습니다.");
    }
    
    // 계좌 목록 조회 API
    @GetMapping("/accounts")
    public ResponseEntity<List<AccountResponseDTO>> getMemberAccounts(@RequestParam(name = "memberNo") int memberNo) {
        List<AccountResponseDTO> accounts = shopService.getAccountsByMember(memberNo);
        return ResponseEntity.ok(accounts);
    }

}
