package mesbiens.account.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import mesbiens.account.repository.AccountJpaRepository;
import mesbiens.account.vo.AccountVO;

@Repository
public class AccountDAOImpl implements AccountDAO {
	@Autowired
	private AccountJpaRepository acctJpaRepo;
	
	// 회원 정보에 맞는 계좌 정보 가져오기
	@Override
	public List<AccountVO> getAccountList(int memberNo) {
		return acctJpaRepo.findByMemNo(memberNo);
	}

	// 계좌 추가하기
	@Override
	public AccountVO addAcct(AccountVO acct) {
		if(acctJpaRepo.existsById(acct.getAccountNo())) {
			return null;
		}
		
		return acctJpaRepo.save(acct);
	}

	// 계좌가 존재하는지 검색(Primary key 기준)
	@Override
	public boolean existsByIdAcct(int accountNo) {
		return acctJpaRepo.findById(accountNo) != null;
	}

	// 계좌 삭제 (삭제한 레코드 개수 반환)
	@Override
	public int delAcct(int accountNo) {
		return acctJpaRepo.delAcct(accountNo);
	}

	// 계좌번호 존재하는지 검색
	@Override
	public boolean existsByAcctNumber(String accountNumber) {
		return acctJpaRepo.findByAccountNumber(accountNumber) != null;
	}

	// 계좌번호를 기준으로 계좌 PK 가져오기
	@Override
	public int acctNumToAcctNo(String accountNumber) {
		return acctJpaRepo.findByAccountNumber(accountNumber).getAccountNo();
	}
	
	
	
}
