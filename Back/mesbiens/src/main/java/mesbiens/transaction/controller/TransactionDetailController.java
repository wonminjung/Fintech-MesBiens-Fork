package mesbiens.transaction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;

import mesbiens.transaction.dto.RecentTransactionRequestDTO;
import mesbiens.transaction.dto.RecentTransactionResponseDTO;
import mesbiens.transaction.service.TransactionDetailService;

import mesbiens.account.service.AccountService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/transaction")
public class TransactionDetailController {
    
	@Autowired
    private TransactionDetailService trnsService;
	
	@Autowired
	private AccountService acctService;
	
	// 현재 로그인 사용자의 memberNo와 시작날짜, 종료날짜 기준으로 거래내역 반환
	@PostMapping("/recent")
	public List<RecentTransactionResponseDTO> getTrnsList(@RequestBody RecentTransactionRequestDTO request) {
		int memberNo = request.getMemberNo();
		LocalDateTime startDate = request.getRecentStartDate().atStartOfDay();
		LocalDateTime endDate = request.getRecentEndDate().atTime(23, 59, 59);
		
		return trnsService.getTrnsList(memberNo, startDate, endDate);
	}

	// 송금
	@PostMapping("/remittance")
	public ResponseEntity<Map<String, String>> remittance(@RequestBody JsonNode requestData) {
		String receiverAccountNumber = requestData.get("receiverAccountNumber").asText();
		String senderAccountNumber = requestData.get("senderAccountNumber").asText();
		Long trnsBalance = requestData.get("trnsBalance").asLong();
		String senderAccountPassword = requestData.get("senderAccountPassword").asText();
		
		int receiverAccountNo = acctService.acctNumToAcctNo(receiverAccountNumber);
		int senderAccountNo = acctService.acctNumToAcctNo(senderAccountNumber);
		
		Map<String, String> response = new HashMap<>();
		
		boolean isExistAccounts = acctService.existsByAcctNumber(receiverAccountNumber) && acctService.existsByAcctNumber(senderAccountNumber);
		if(!isExistAccounts) {
			response.put("message", "보내는 계좌나 받는 계좌가 존재하지 않습니다.");
			return ResponseEntity.badRequest().body(response);
		}
		
		if(senderAccountPassword.length() != 4) {
			response.put("message", "계좌 비밀번호는 4자로 입력해주세요.");
			return ResponseEntity.badRequest().body(response);
		}
		
		if(trnsBalance < 0) {
			response.put("message", "이체 금액이 0보다 작습니다.");
			return ResponseEntity.badRequest().body(response);
		}
		
		boolean passwordMatch = trnsService.pwdMatch(senderAccountNo, senderAccountPassword);
		if(!passwordMatch) {
			response.put("message", "계좌 패스워드가 일치하지 않습니다.");
			return ResponseEntity.badRequest().body(response);
		}
		
		boolean isRemittancePossible = trnsService.isRemittance(senderAccountNo, trnsBalance);
		if(!isRemittancePossible) {
			response.put("message", "계좌에 금액이 부족합니다.");
			return ResponseEntity.badRequest().body(response);
		}
		
		boolean result = trnsService.remittance(receiverAccountNo, senderAccountNo, trnsBalance);
		if(result) {
			response.put("message", "송금 완료");
			return ResponseEntity.ok(response);
		}
		
		response.put("message", "송금 실패");
		return ResponseEntity.badRequest().body(response);
	}
    
}






