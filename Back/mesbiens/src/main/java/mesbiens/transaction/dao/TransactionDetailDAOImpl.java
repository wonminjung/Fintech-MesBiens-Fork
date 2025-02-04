package mesbiens.transaction.dao;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import mesbiens.transaction.vo.TransactionDetailVO;
import mesbiens.account.repository.AccountJpaRepository;
import mesbiens.account.vo.AccountVO;
import mesbiens.transaction.dto.RecentTransactionResponseDTO;
import mesbiens.transaction.repository.TransactionDetailRepository;


@Repository
public class TransactionDetailDAOImpl implements TransactionDetailDAO {

    @Autowired
    private TransactionDetailRepository trnsJpaRepo;
    
    @Autowired
    private AccountJpaRepository acctJpaRepo;

	// 모든 거래내역 반환
	@Override
	public List<TransactionDetailVO> allList() {
		return trnsJpaRepo.findAll();
	}

	// 인증 토큰에 저장된 현재 로그인 사용자의 memberNo를 기준으로 거래내역 반환
	@Override
	public List<RecentTransactionResponseDTO> getTrnsList(LocalDateTime startDate, LocalDateTime endDate) {
		return trnsJpaRepo.findRecentList(startDate, endDate);
	}

	// 계좌 정보 가져오기
	@Override
	public Optional<AccountVO> getAccount(int senderAccountNo) {
		return acctJpaRepo.findById(senderAccountNo);
	}

	// 잔액 업데이트
	@Override
	public boolean updateBalance(Optional<AccountVO> receiverAccount, Optional<AccountVO> senderAccount) {
		AccountVO updateReceiverAccount = acctJpaRepo.save(receiverAccount.get());
		AccountVO updateSenderAccount = acctJpaRepo.save(senderAccount.get());
		
		return updateReceiverAccount != null && updateSenderAccount != null;
	}

    
	


//    @Override // 전체 조회
//    public List<TransactionDetailVO> findAllTransactions() {
//        return trsdrepo.findAll();
//    }
//
//    @Override // 특정 날짜 조회
//    public List<TransactionDetailVO> findTransactionsDate(Timestamp startDate, Timestamp endDate) {
//        return trsdrepo.findByTransactionCreateAtBetween(startDate, endDate);
//    }
//
//    @Override // 거래 내역 저장
//    public void saveTransaction(TransactionDetailVO transactionDetailVO) {
//        trsdrepo.save(transactionDetailVO);
//    }
//
//    @Override // 거래 내역 삭제
//    public void deleteTransaction(int id) {
//        trsdrepo.deleteById(id);
//    }
//
//    @Override
//    public boolean existsById(int id) {
//        return trsdrepo.existsById(id);
//    }
//
//    @Override // 로그 저장
//    public void saveLog(String logMessage) {
//        // 로그 저장 로직 구현
//        // 예: 로그를 별도의 테이블에 저장하거나 파일에 기록
//    }
}