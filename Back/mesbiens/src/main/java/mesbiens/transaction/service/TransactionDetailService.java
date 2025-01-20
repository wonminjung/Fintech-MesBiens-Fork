package mesbiens.transaction.service;

import java.sql.Timestamp;
import java.util.List;

import mesbiens.transaction.vo.TransactionDetailVO;
import mesbiens.transaction.vo.TransactionType;

public interface TransactionDetailService {

	List<TransactionDetailVO> getTransactionsByType(TransactionType transactionType);

	List<TransactionDetailVO> getAllTransactionList();

	List<TransactionDetailVO> getTransactionByDateRange(Timestamp startDate, Timestamp endDate);

	void deposit(TransactionDetailVO transactionDetailVO);

	void withdrawal(TransactionDetailVO transactionDetailVO);

	void payment(TransactionDetailVO transactionDetailVO);


	void deleteTransaction(int id);

	void createLog(String logMessage);







}
