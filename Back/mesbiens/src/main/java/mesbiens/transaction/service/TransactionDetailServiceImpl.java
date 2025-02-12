package mesbiens.transaction.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import mesbiens.account.vo.AccountVO;
import mesbiens.transaction.dao.TransactionDetailDAO;
import mesbiens.transaction.dto.RecentTransactionResponseDTO;
import mesbiens.transaction.vo.ConsumptionCategoryVO;
import mesbiens.transaction.vo.TransactionDetailVO;
import mesbiens.transaction.vo.TransactionType;

@Service
public class TransactionDetailServiceImpl implements TransactionDetailService {

    @Autowired
    private TransactionDetailDAO trnsDao; // 거래내역 DAO
    
    // 영속성 컨텍스트 의존성 주입
    @PersistenceContext
    private EntityManager entityManager;

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
	public boolean remittance(int receiverAccountNo, int senderAccountNo, Long trnsBalance) {
		Optional<AccountVO> receiverAccount = trnsDao.getAccount(receiverAccountNo);
		Optional<AccountVO> senderAccount = trnsDao.getAccount(senderAccountNo);
		Long receiverBalance = receiverAccount.get().getAccountBalance();
		Long senderBalance = senderAccount.get().getAccountBalance();
		
		senderAccount.get().setAccountBalance(senderBalance - trnsBalance);
		receiverAccount.get().setAccountBalance(receiverBalance + trnsBalance);
		
		return trnsDao.updateBalance(receiverAccount, senderAccount);
	}

	// 거래내역 생성
	@Override
	public void createTrnsDetail(int receiverAccountNo, int senderAccountNo, Long trnsBalance) {
		TransactionDetailVO trnsDetailDeposit = new TransactionDetailVO();
		TransactionDetailVO trnsDetailWithdrawal = new TransactionDetailVO();
		
		AccountVO receiverAccount = entityManager.getReference(AccountVO.class, receiverAccountNo);
		AccountVO senderAccount = entityManager.getReference(AccountVO.class, senderAccountNo);
		ConsumptionCategoryVO category = entityManager.getReference(ConsumptionCategoryVO.class, 6); // 소비 카테고리 6: 기타
		
		trnsDetailDeposit.setReceiverAccountNo(receiverAccount); // 받는 계좌
		trnsDetailDeposit.setSenderAccountNo(senderAccount); // 보낸 계좌
		trnsDetailDeposit.setConsumptionCateNo(category); // 소비 카테고리
		trnsDetailDeposit.setTrnsBalance(trnsBalance); // 거래 금액
		trnsDetailDeposit.setTrnsPlace("메비앙"); // 거래 장소
		trnsDetailDeposit.setTrnsMemo("기타 거래"); // 거래 내용
		trnsDetailDeposit.setTrnsTypeName(TransactionType.DEPOSIT);

		trnsDetailWithdrawal.setReceiverAccountNo(senderAccount); // 받는 계좌
		trnsDetailWithdrawal.setSenderAccountNo(receiverAccount); // 보낸 계좌
		trnsDetailWithdrawal.setConsumptionCateNo(category); // 소비 카테고리
		trnsDetailWithdrawal.setTrnsBalance(trnsBalance); // 거래 금액
		trnsDetailWithdrawal.setTrnsPlace("메비앙"); // 거래 장소
		trnsDetailWithdrawal.setTrnsMemo("기타 거래"); // 거래 내용
		trnsDetailWithdrawal.setTrnsTypeName(TransactionType.WITHDRAWAL);
		
		trnsDao.createTrnsDetail(trnsDetailDeposit, trnsDetailWithdrawal);
	}
	
	

}






