package mesbiens.transaction.service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import mesbiens.transaction.vo.TransactionDetailVO;

public interface TransactionDetailService {

	// 모든 거래내역 반환
	List<TransactionDetailVO> allList();

	// 인증 토큰에 저장된 현재 로그인 사용자의 memberNo를 기준으로 거래내역 반환
	boolean getTrnsList(LocalDateTime startDate, LocalDateTime endDate);
	
	
	
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
