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
	
	// 인증 토큰에 저장된 현재 로그인 사용자의 memberNo를 기준으로 시작일시와 종료일시 사이의 거래내역 반환
	@PostMapping("/recent")
	public List<RecentTransactionResponseDTO> getTrnsList(@RequestBody RecentTransactionRequestDTO requestDate) {
//		Map<String, String> response = new HashMap<>();
//		
//		if(requestDate == null) {
//			response.put("message", "전달받은 날짜 정보가 존재하지 않음");
//			return ResponseEntity.badRequest().body(response);
//		}
		
		// LocalDate 타입을 localDateTime 타입으로 변환하면서 시간 정보 추가
		LocalDateTime startDate = requestDate.getRecentStartDate().atStartOfDay();
		LocalDateTime endDate = requestDate.getRecentEndDate().atTime(23, 59, 59);
		
		return trnsService.getTrnsList(startDate, endDate);
		
//		boolean result = trnsService.getTrnsList(startDate, endDate);
//		if(result) {
//			response.put("message", "거래 내역 가져오기 성공");
//			return ResponseEntity.ok(response);
//		}
//		
//		response.put("message", "거래 내역 가져오기 실패");
//		return ResponseEntity.badRequest().body(response);
	}

	// 송금
	@PostMapping("/remittance")
	public ResponseEntity<Map<String, String>> remittance(@RequestBody JsonNode requestData) {
		int receiverAccountNo = requestData.get("receiverAccountNo").asInt();
		int senderAccountNo = requestData.get("senderAccountNo").asInt();
		Long trnsBalance = requestData.get("trnsBalance").asLong();
		String receiveAccountPassword = requestData.get("receiveAccountPassword").asText();
		
		Map<String, String> response = new HashMap<>();
		
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
    
    
//    @GetMapping // 거래 내역 조회 (전체 조회)
//    public List<TransactionDetailVO> getAllTransactionList() {
//    	return trsdService.getAllTransactionList();
//    }
//
//    // 특정 날짜 범위 거래 내역 조회
//    @GetMapping("/date")
//    public List<TransactionDetailVO> getTransactionDate(
//        @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Timestamp startDate,
//        @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Timestamp endDate) {
//        return trsdService.getTransactionDate(startDate, endDate);
//    }
//
//    // 입금 처리 및 거래 내역 생성
//    @PostMapping("/deposit")
//    public ResponseEntity<String> deposit(@Validated @RequestBody TransactionDetailVO transactionDetailVO) {
//        trsdService.deposit(transactionDetailVO);
//        return ResponseEntity.ok("입금이 완료되었습니다.");
//    }
//
//    // 출금 처리 및 거래 내역 생성
//    @PostMapping("/withdrawal")
//    public ResponseEntity<String> withdraw(@RequestBody TransactionDetailVO transactiontype) {
//        trsdService.withdrawal(transactiontype); // 출금과 동시에 거래 내역 생성
//        return ResponseEntity.ok("출금이 완료되었습니다.");
//    }
//
//    // 결제 처리 및 거래 내역 생성
//    @PostMapping("/payment")
//    public ResponseEntity<String> payment(@RequestBody TransactionDetailVO transactiontype) {
//        trsdService.payment(transactiontype); // 결제와 동시에 거래 내역 생성
//        return ResponseEntity.ok("결제가 완료되었습니다.");
//    }
//    
//    // 거래내역 삭제
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<String> deleteTransaction(@PathVariable("id") int id) {
//        trsdService.deleteTransaction(id);
//        return ResponseEntity.ok("거래 내역 삭제가 완료되었습니다.");
//    }
//    
//    // 로그 생성
//    @PostMapping("/log")
//    public ResponseEntity<String> createLog(@RequestBody String logMessage) {
//        trsdService.createLog(logMessage);
//        return ResponseEntity.ok("로그 생성이 완료되었습니다.");
//    }
}