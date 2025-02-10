package mesbiens.transaction.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mesbiens.account.vo.AccountVO;
import mesbiens.transaction.dao.TransactionDetailDAO;
import mesbiens.transaction.dto.RecentTransactionResponseDTO;
import mesbiens.transaction.vo.TransactionDetailVO;

@Service
public class TransactionDetailServiceImpl implements TransactionDetailService {

    @Autowired
    private TransactionDetailDAO trnsDao; // 거래내역 DAO

	// 모든 거래내역 반환
	@Override
	public List<TransactionDetailVO> allList() {
		return trnsDao.allList();
	}

	// 현재 로그인 사용자의 memberNo와 시작날짜, 종료날짜 기준으로 거래내역 반환
	@Override
	public List<RecentTransactionResponseDTO> getTrnsList(int memberNo, LocalDateTime startDate, LocalDateTime endDate) {
		return trnsDao.getTrnsList(memberNo, startDate, endDate);
	}
	
	// 전송 계좌 패스워드 일치하는지 확인
	@Override
	public boolean pwdMatch(int senderAccountNo, String senderAccountPassword) {
		Optional<AccountVO> account = trnsDao.getAccount(senderAccountNo);
		String password = account.get().getAccountPassword();
		
		return password.trim().equals(senderAccountPassword);
	}

	// 금액 전송 가능 여부 확인
	@Override
	public boolean isRemittance(int senderAccountNo, Long trnsBalance) {
		Optional<AccountVO> account = trnsDao.getAccount(senderAccountNo);
		Long amount = account.get().getAccountBalance();
		
		return amount >= trnsBalance;
	}

	// 송금하기
	@Override
	@Transactional
	public boolean remittance(int receiverAccountNo, int senderAccountNo, Long trnsBalance) {
		Optional<AccountVO> receiverAccount = trnsDao.getAccount(receiverAccountNo);
		Optional<AccountVO> senderAccount = trnsDao.getAccount(senderAccountNo);
		Long receiverBalance = receiverAccount.get().getAccountBalance();
		Long senderBalance = senderAccount.get().getAccountBalance();
		
		senderAccount.get().setAccountBalance(senderBalance - trnsBalance);
		receiverAccount.get().setAccountBalance(receiverBalance + trnsBalance);
		
		return trnsDao.updateBalance(receiverAccount, senderAccount);
	}

}






