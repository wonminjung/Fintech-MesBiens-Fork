package mesbiens.transaction.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mesbiens.transaction.service.TransactionDetailLogService;
import mesbiens.transaction.vo.TransactionLogType;

@RestController
@RequestMapping("/api/logs")
public class TransactionDetailLogController {
	
	@Autowired
    private TransactionDetailLogService trsdlogService;

    // 1. 전체 로그 조회
    @GetMapping
    public ResponseEntity<List<TransactionLogType>> getAllLogs() {
        List<TransactionLogType> logs = trsdlogService.getAllLogs();
        return ResponseEntity.ok(logs);
    }

    // 2. 특정 Transaction ID의 로그 조회
    @GetMapping("/{transactionId}")
    public ResponseEntity<TransactionLogType> getLogByTransactionId(@PathVariable String transactionId) {
    	TransactionLogType log = trsdlogService.getLogByTransactionId(transactionId);
        if (log == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(log);
    }
    
    // 3. 거래 유형별 로그 조회
    @GetMapping("/type/{transactionType}")
    public ResponseEntity<List<TransactionLogType>> getLogsByTransactionType(@PathVariable String transactionType) {
        List<TransactionLogType> logs = trsdlogService.findAllByTransactionType(transactionType);
        if (logs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(logs);
    }


    // 4. 은행별 로그 조회
    @GetMapping("/bank/{bankName}")
    public ResponseEntity<List<TransactionLogType>> getLogsByBank(@PathVariable String bankName) {
        List<TransactionLogType> logs = trsdlogService.findAllByBankName(bankName);
        if (logs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(logs);
    }

    

}