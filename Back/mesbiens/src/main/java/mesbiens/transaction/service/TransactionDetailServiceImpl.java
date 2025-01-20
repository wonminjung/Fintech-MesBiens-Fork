package mesbiens.transaction.service;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import mesbiens.transaction.dao.TransactionDetailDAO;
import mesbiens.transaction.vo.TransactionDetailVO;
import mesbiens.transaction.vo.TransactionType;

public class TransactionDetailServiceImpl implements TransactionDetailService {

	@Autowired
	private TransactionDetailDAO trsdDAO;

	@Override // 전체 거래 내역 조회
	public List<TransactionDetailVO> getAllTransactionList() {
		return trsdDAO.findAllTransactions();
	}

	@Override // 특정 날짜 범위 거래 내역 조회
	public List<TransactionDetailVO> getTransactionByDateRange(Timestamp startDate, Timestamp endDate) {
		return trsdDAO.findTransactionsByDateRange(startDate, endDate);
	}

	@Override // 거래 유형
	public List<TransactionDetailVO> getTransactionsByType(TransactionType transactionType) {
		return null;
	}

	@Override
	public void deposit(TransactionDetailVO transactionDetailVO) {
		// 입력된 거래 세부 정보 유효성 검사
		if (transactionDetailVO == null || transactionDetailVO.getTransactionBalance() <= 0) {
			throw new IllegalArgumentException("유효하지 않은 거래 세부 정보입니다.");
		}

		try {
			// 거래 타입 설정: 입금
			transactionDetailVO.setTransactionTypeName(TransactionType.DEPOSIT);

			// 거래 날짜 설정: 현재 날짜
			transactionDetailVO.setTransactionCreateAt(new Timestamp(System.currentTimeMillis()));

			// DAO를 통해 거래 내역 저장
			trsdDAO.saveTransaction(transactionDetailVO);
		} catch (Exception e) {
			// 예외 발생 시 로깅 및 재처리
			System.err.println("입금 처리 중 오류 발생: " + e.getMessage());
			throw new RuntimeException("입금 처리에 실패했습니다.", e);
		}
	}

	@Override // 출금
	public void withdrawal(TransactionDetailVO transactionDetailVO) {
		// 입력된 거래 세부 정보 유효성 검사
		if (transactionDetailVO == null || transactionDetailVO.getTransactionBalance() <= 0) {
			throw new IllegalArgumentException("유효하지 않은 거래 세부 정보입니다.");
		}

		try {
			// 거래 타입 설정: 출금
			transactionDetailVO.setTransactionTypeName(TransactionType.WITHDRAWAL);

			// 거래 날짜 설정: 현재 날짜
			transactionDetailVO.setTransactionCreateAt(new Timestamp(System.currentTimeMillis()));

			// DAO를 통해 거래 내역 저장
			trsdDAO.saveTransaction(transactionDetailVO);
		} catch (Exception e) {
			// 예외 발생 시 로깅 및 재처리
			System.err.println("출금 처리 중 오류 발생: " + e.getMessage());
			throw new RuntimeException("출금 처리에 실패했습니다.", e);
		}
	}

	@Override // 결제
	public void payment(TransactionDetailVO transactionDetailVO) {
		// 입력된 거래 세부 정보 유효성 검사
		if (transactionDetailVO == null || transactionDetailVO.getTransactionBalance() <= 0) {
			throw new IllegalArgumentException("유효하지 않은 거래 세부 정보입니다.");
		}

		try {
			// 거래 타입 설정: 결제
			transactionDetailVO.setTransactionTypeName(TransactionType.PAYMENT);

			// 거래 날짜 설정: 현재 날짜
			transactionDetailVO.setTransactionCreateAt(new Timestamp(System.currentTimeMillis()));

			// DAO를 통해 거래 내역 저장
			trsdDAO.saveTransaction(transactionDetailVO);
		} catch (Exception e) {
			// 예외 발생 시 로깅 및 재처리
			System.err.println("결제 처리 중 오류 발생: " + e.getMessage());
			throw new RuntimeException("결제 처리에 실패했습니다.", e);
		}
	}

	@Override // 거래 삭제
	public void deleteTransaction(int id) {
		trsdDAO.deleteTransaction(id);
	}

	@Override // 거래 로그 생성
	public void createLog(String logMessage) {
		trsdDAO.saveLog(logMessage);
	}

}
