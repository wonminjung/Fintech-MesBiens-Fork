package mesbiens.transaction.dao;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

import mesbiens.transaction.vo.TransactionDetailVO;
import mesbiens.transaction.vo.TransactionType;

public interface TransactionDetailDAO {

	List<TransactionDetailVO> findAllTransactions(); 

	List<TransactionDetailVO> findTransactionsByDateRange(Timestamp startDate, Timestamp endDate); //거래 시간 범위 설정

	void deleteTransaction(int id);

	void saveLog(String logMessage);

	void saveTransaction(TransactionDetailVO transactionDetailVO);

	void setTransactionType(TransactionType deposit);

	void setTransactionDate(LocalDate now);


}
