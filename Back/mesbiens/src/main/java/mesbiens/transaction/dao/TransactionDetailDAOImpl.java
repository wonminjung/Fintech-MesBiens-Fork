package mesbiens.transaction.dao;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

import mesbiens.transaction.vo.TransactionDetailVO;
import mesbiens.transaction.vo.TransactionType;

public class TransactionDetailDAOImpl implements TransactionDetailDAO {

	@Override
	public List<TransactionDetailVO> findAllTransactions() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<TransactionDetailVO> findTransactionsByDateRange(Timestamp startDate, Timestamp endDate) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteTransaction(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void saveLog(String logMessage) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void saveTransaction(TransactionDetailVO transactionDetailVO) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setTransactionType(TransactionType deposit) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setTransactionDate(LocalDate now) {
		// TODO Auto-generated method stub
		
	}

}
