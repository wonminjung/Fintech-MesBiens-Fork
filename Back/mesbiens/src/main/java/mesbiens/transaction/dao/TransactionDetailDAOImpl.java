package mesbiens.transaction.dao;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

	// 현재 로그인 사용자의 memberNo와 시작날짜, 종료날짜 기준으로 거래내역 반환
	@Override
	public List<RecentTransactionResponseDTO> getTrnsList(int memberNo, LocalDateTime startDate, LocalDateTime endDate) {
		return trnsJpaRepo.findRecentList(memberNo, startDate, endDate);
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


}







