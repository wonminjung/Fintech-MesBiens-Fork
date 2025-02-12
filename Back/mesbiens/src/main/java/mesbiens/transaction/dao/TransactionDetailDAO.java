package mesbiens.transaction.dao;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import mesbiens.account.vo.AccountVO;
import mesbiens.transaction.dto.RecentTransactionResponseDTO;
import mesbiens.transaction.vo.TransactionDetailVO;

public interface TransactionDetailDAO {

	// 현재 로그인 사용자의 memberNo와 시작날짜, 종료날짜 기준으로 거래내역 반환
	List<RecentTransactionResponseDTO> getTrnsList(int memberNo, LocalDateTime startDate, LocalDateTime endDate);
	
	// 계좌 정보 가져오기
	Optional<AccountVO> getAccount(int senderAccountNo);

	// 잔액 업데이트
	boolean updateBalance(Optional<AccountVO> receiverAccount, Optional<AccountVO> senderAccount);

	// 거래 내역 생성
	void createTrnsDetail(TransactionDetailVO trnsDetailDeposit, TransactionDetailVO trnsDetailWithdrawal);

	
}