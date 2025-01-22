package mesbiens.transaction.service;

import java.util.List;

import org.springframework.stereotype.Service;

import mesbiens.transaction.vo.TransactionLogType;

@Service
public interface TransactionDetailLogService {

	List<TransactionLogType> getAllLogs();

	List<TransactionLogType> findAllByTransactionType(String transactionType);

	List<TransactionLogType> findAllByBankName(String bankName);

	TransactionLogType getLogByTransactionId(String transactionId);

}
