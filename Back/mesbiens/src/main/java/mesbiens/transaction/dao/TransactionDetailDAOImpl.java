package mesbiens.transaction.dao;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import mesbiens.transaction.repository.TransactionDetailRepository;
import mesbiens.transaction.vo.TransactionDetailVO;

@Repository
public class TransactionDetailDAOImpl implements TransactionDetailDAO {

	@Autowired
	private TransactionDetailRepository trsdrepo;
	private CrudRepository<TransactionDetailVO, Integer> trsdDAO;
	
	@Override //전체 조회
	public List<TransactionDetailVO> findAllTransactions() {
		return trsdrepo.findAll();
	}

	@Override // 특정날짜 조회
	public List<TransactionDetailVO> findTransactionsDate(Timestamp startDate, Timestamp endDate) {
		return trsdrepo.findByTransactionCreateAtBetween(startDate, endDate);
	}

	@Override //거래내역 저장
	public void saveTransaction(TransactionDetailVO transactionDetailVO) {
		
	}

	@Override //거래내역 삭제
	public void deleteTransaction(int id) {
		
	}

	@Override
	public boolean existsById(int id) {
		return trsdDAO.existsById(id);
	}

	@Override //로그 저장
	public void saveLog(String logMessage) {
		
	}

}
