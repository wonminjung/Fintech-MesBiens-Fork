package mesbiens.transaction.service;

import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mesbiens.transaction.vo.TransactionLogType;

@Service
@Transactional
public class TransactionDetailLogServiceImpl implements TransactionDetailLogService {

	@Override
	public List<TransactionLogType> getAllLogs() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<TransactionLogType> findAllByTransactionType(String transactionType) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<TransactionLogType> findAllByBankName(String bankName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public TransactionLogType getLogByTransactionId(String transactionId) {
		// TODO Auto-generated method stub
		return null;
	}

}
