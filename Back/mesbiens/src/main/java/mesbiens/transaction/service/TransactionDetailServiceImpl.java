package mesbiens.transaction.service;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;

import mesbiens.account.repository.AccountJpaRepository;
import mesbiens.account.vo.AccountVO;
import mesbiens.transaction.dao.TransactionDetailDAO;
import mesbiens.transaction.vo.TransactionDetailVO;
import mesbiens.transaction.vo.TransactionType;

@Service
public class TransactionDetailServiceImpl implements TransactionDetailService {
    
    @SpringBootApplication
    @ComponentScan(basePackages = "mesbiens") // 필요한 패키지 경로를 정확히 지정
    public class Application {
        public static void main(String[] args) {
            SpringApplication.run(Application.class, args);
        }
    }

    @Autowired
    private TransactionDetailDAO trsdDAO; // 거래내역 DAO
    
    @Autowired
    private AccountJpaRepository acctJpaRepo; // 계좌 정보 관리 Repository

    @Override // 전체 거래 내역 조회
    public List<TransactionDetailVO> getAllTransactionList() {
        return trsdDAO.findAllTransactions();
    }

    @Override // 특정 날짜 범위 거래 내역 조회
    public List<TransactionDetailVO> getTransactionDate(Timestamp startDate, Timestamp endDate) {
        return trsdDAO.findTransactionsDate(startDate, endDate);
    }

    @Override // 입금
    public void deposit(TransactionDetailVO transactionDetailVO) {
        if (transactionDetailVO.getTransactionBalance() == null) {
            throw new IllegalArgumentException("거래 금액이 null입니다.");
        }
        if (transactionDetailVO.getTransactionBalance() <= 0) {
            throw new IllegalArgumentException("거래 금액은 0보다 커야 합니다.");
        }

        try {
            // 거래 타입 설정: 입금
            transactionDetailVO.setTransactionTypeName(TransactionType.DEPOSIT);

            // 거래 날짜 설정: 현재 날짜
            transactionDetailVO.setTransactionCreateAt(new Timestamp(System.currentTimeMillis()));

            // 계좌 잔액 업데이트
            AccountVO account = transactionDetailVO.getTransactionReceiverAccountNo();  // AccountVO를 직접 가져옴
            if (account == null) {
                throw new IllegalArgumentException("계좌 정보가 없습니다.");
            }
            // 계좌의 잔액을 업데이트
            account.setAccountBalance(account.getAccountBalance() + transactionDetailVO.getTransactionBalance());
            // 계좌 정보 저장
            acctJpaRepo.save(account);

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
        if (transactionDetailVO == null) {
            throw new IllegalArgumentException("거래 세부 정보가 null입니다.");
        }
        if (transactionDetailVO.getTransactionBalance() <= 0) {
            throw new IllegalArgumentException("거래 금액은 0보다 커야 합니다.");
        }

        try {
            // 거래 타입 설정: 출금
            transactionDetailVO.setTransactionTypeName(TransactionType.WITHDRAWAL);

            // 거래 날짜 설정: 현재 날짜
            transactionDetailVO.setTransactionCreateAt(new Timestamp(System.currentTimeMillis()));

            // 계좌 잔액 업데이트 (출금하는 계좌)
            AccountVO account = transactionDetailVO.getTransactionSenderAccountNo();  // 출금하는 계좌 가져오기
            if (account == null) {
                throw new IllegalArgumentException("계좌 정보가 없습니다.");
            }
            
            // 계좌 잔액이 출금 금액보다 적으면 예외 처리
            if (account.getAccountBalance() < transactionDetailVO.getTransactionBalance()) {
                throw new IllegalArgumentException("잔액이 부족합니다.");
            }

            // 계좌의 잔액을 업데이트 (출금)
            account.setAccountBalance(account.getAccountBalance() - transactionDetailVO.getTransactionBalance());
            // 계좌 정보 저장
            acctJpaRepo.save(account);
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
        if (transactionDetailVO == null || transactionDetailVO.getTransactionBalance() <= 0) {
            throw new IllegalArgumentException("유효하지 않은 거래 세부 정보입니다.");
        }

        try {
            // 거래 타입 설정: 결제
            transactionDetailVO.setTransactionTypeName(TransactionType.PAYMENT);

            // 거래 날짜 설정: 현재 날짜
            transactionDetailVO.setTransactionCreateAt(new Timestamp(System.currentTimeMillis()));

            // 계좌 잔액 업데이트 (결제하는 계좌)
            AccountVO account = transactionDetailVO.getTransactionSenderAccountNo();  // 결제하는 계좌 가져오기
            if (account == null) {
                throw new IllegalArgumentException("계좌 정보가 없습니다.");
            }
            
            // 계좌 잔액이 결제 금액보다 적으면 예외 처리
            if (account.getAccountBalance() < transactionDetailVO.getTransactionBalance()) {
                throw new IllegalArgumentException("잔액이 부족합니다.");
            }

            // 계좌의 잔액을 업데이트 (결제)
            account.setAccountBalance(account.getAccountBalance() - transactionDetailVO.getTransactionBalance());
            // 계좌 정보 저장
            acctJpaRepo.save(account);
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