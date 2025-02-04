package mesbiens.transaction.service;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.stereotype.Service;

import mesbiens.transaction.vo.TransactionDetailVO;

public interface TransactionDetailService {

	// 모든 거래내역 반환
	List<TransactionDetailVO> allList();
	
	
	
//	List<TransactionDetailVO> getAllTransactionList();
//
//	List<TransactionDetailVO> getTransactionDate(Timestamp startDate, Timestamp endDate);
//
//
//	void withdrawal(TransactionDetailVO transactionDetailVO);
//
//	void payment(TransactionDetailVO transactionDetailVO);
//
//	void deleteTransaction(int id);
//
//	void createLog(String logMessage);
//
//	void deposit(TransactionDetailVO transactionDetailVO);
}
