package mesbiens.transaction.dao;

import java.sql.Timestamp;
import java.util.List;

import mesbiens.transaction.vo.TransactionDetailVO;

public interface TransactionDetailDAO {

	// 모든 거래내역 반환
	List<TransactionDetailVO> allList();
	
	
//    List<TransactionDetailVO> findAllTransactions();
//    List<TransactionDetailVO> findTransactionsDate(Timestamp startDate, Timestamp endDate);
//    void saveTransaction(TransactionDetailVO transactionDetailVO);
//    boolean existsById(int id);
//    void deleteTransaction(int id);
//    void saveLog(String logMessage);
	
	
}