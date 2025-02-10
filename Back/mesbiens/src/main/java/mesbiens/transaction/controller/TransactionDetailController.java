package mesbiens.transaction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;

import mesbiens.transaction.dto.RecentTransactionRequestDTO;
import mesbiens.transaction.dto.RecentTransactionResponseDTO;
import mesbiens.transaction.dto.TransactionResponseDTO;
import mesbiens.transaction.service.TransactionDetailService;
import mesbiens.transaction.vo.TransactionDetailVO;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/transaction")
public class TransactionDetailController {
    
	@Autowired
    private TransactionDetailService trnsService;
	
	// 모든 거래내역 반환
	@GetMapping("/all")
	public List<TransactionResponseDTO> all() {
		List<TransactionDetailVO> trnsList = trnsService.allList();
		List<TransactionResponseDTO> response = new ArrayList<>();
		
		trnsList.stream().forEach((trns) -> {
			TransactionResponseDTO res = new TransactionResponseDTO(trns);
			response.add(res);
		});
		
		return response;
	}
	
	// 시작일과 종료일 사이의 거래내역 반환
	@PostMapping("/recent")
	public List<RecentTransactionResponseDTO> getTrnsList(@RequestBody RecentTransactionRequestDTO requestDate) {		
		// LocalDate 타입을 localDateTime 타입으로 변환하면서 시간 정보 추가
		LocalDateTime startDate = requestDate.getRecentStartDate().atStartOfDay();
		LocalDateTime endDate = requestDate.getRecentEndDate().atTime(23, 59, 59);
		
		return trnsService.getTrnsList(startDate, endDate);
	}

	// 송금
	@PostMapping("/remittance")
	public ResponseEntity<Map<String, String>> remittance(@RequestBody JsonNode requestData) {
		int receiverAccountNo = requestData.get("receiverAccountNo").asInt();
		int senderAccountNo = requestData.get("senderAccountNo").asInt();
		Long trnsBalance = requestData.get("trnsBalance").asLong();
		String receiveAccountPassword = requestData.get("receiveAccountPassword").asText();
		
		Map<String, String> response = new HashMap<>();
		
		if(trnsBalance < 0) {
			response.put("message", "이체 금액이 0보다 작습니다.");
			return ResponseEntity.badRequest().body(response);
		}
		
		boolean passwordMatch = trnsService.pwdMatch(senderAccountNo, receiveAccountPassword);
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






