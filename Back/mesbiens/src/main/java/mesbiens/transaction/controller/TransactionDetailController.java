package mesbiens.transaction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mesbiens.transaction.service.TransactionDetailService;
//import mesbiens.transaction.vo.AutoTransferVO; --자동결제 추가해야함
import mesbiens.transaction.vo.TransactionDetailVO;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/transactiondetail")
public class TransactionDetailController {
	
	@Autowired
	private TransactionDetailService trsdService;

    @GetMapping // 거래 내역 조회 (전체 조회)
    public List<TransactionDetailVO> getAllTransactionList() {
        return trsdService.getAllTransactionList();
    }
    
    // 특정 날짜 범위 거래 내역 조회
    @GetMapping("/")
    public List<TransactionDetailVO> getTransactionByDateRange(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Timestamp startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Timestamp endDate) {
        return trsdService.getTransactionByDateRange(startDate, endDate);
    }

    // 입금 처리 및 거래 내역 생성
    @PostMapping("/deposit")
    public ResponseEntity<String> deposit(@RequestBody TransactionDetailVO transactiontype) {
        trsdService.deposit(transactiontype); // 입금과 동시에 거래 내역 생성
        return ResponseEntity.ok("Deposit successful. Transaction recorded.");
    }
    
    // 출금 처리 및 거래 내역 생성
    @PostMapping("/withdrawal")
    public ResponseEntity<String> withdraw(@RequestBody TransactionDetailVO transactiontype) {
        trsdService.withdrawal(transactiontype); // 출금과 동시에 거래 내역 생성
        return ResponseEntity.ok("Withdrawal successful. Transaction recorded.");
    }

    // 결제 처리 및 거래 내역 생성
    @PostMapping("/payment")
    public ResponseEntity<String> payment(@RequestBody TransactionDetailVO transactiontype) {
        trsdService.payment(transactiontype); // 결제와 동시에 거래 내역 생성
        return ResponseEntity.ok("Payment successful. Transaction recorded.");
    }

    // 거래 내역 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable int id) {
        trsdService.deleteTransaction(id);
        return ResponseEntity.ok("Transaction deleted successfully.");
    }

    // 로그 생성
    @PostMapping("/log")
    public ResponseEntity<String> createLog(@RequestBody String logMessage) {
        trsdService.createLog(logMessage);
        return ResponseEntity.ok("Log created successfully.");
    }
}

