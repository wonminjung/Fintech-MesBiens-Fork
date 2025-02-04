package mesbiens.transaction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mesbiens.transaction.dto.TransactionResponseDTO;
import mesbiens.transaction.service.TransactionDetailService;
import mesbiens.transaction.vo.TransactionDetailVO;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

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
	
	// 인증 토큰에 저장된 현재 로그인 사용자의 memberNo를 기준으로 거래내역 반환
	@GetMapping("/details/{memberNo}")
	public void getTrnsList() {
		
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