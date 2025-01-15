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

	// 계좌 가져오기
	@Override
	public List<AccountVO> getAcctInfo() {
		return acctJpaRepo.findAll();
	}

	// 계좌 추가하기
	@Override
	public void addAcct(AccountVO acct) {
		acctJpaRepo.save(acct);
	}
	
	
	
}
