package mesbiens.transaction.dao;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import mesbiens.account.vo.AccountVO;
import mesbiens.transaction.dto.RecentTransactionResponseDTO;
import mesbiens.transaction.vo.TransactionDetailVO;

public interface TransactionDetailDAO {

	// 모든 거래내역 반환
	List<TransactionDetailVO> allList();

	// 인증 토큰에 저장된 현재 로그인 사용자의 memberNo를 기준으로 거래내역 반환
	List<RecentTransactionResponseDTO> getTrnsList(LocalDateTime startDate, LocalDateTime endDate);
	
	// 계좌 정보 가져오기
	Optional<AccountVO> getAccount(int senderAccountNo);

	// 잔액 업데이트
	boolean updateBalance(Optional<AccountVO> receiverAccount, Optional<AccountVO> senderAccount);

	
//    List<TransactionDetailVO> findAllTransactions();
//    List<TransactionDetailVO> findTransactionsDate(Timestamp startDate, Timestamp endDate);
//    void saveTransaction(TransactionDetailVO transactionDetailVO);
//    boolean existsById(int id);
//    void deleteTransaction(int id);
//    void saveLog(String logMessage);
	
	
}