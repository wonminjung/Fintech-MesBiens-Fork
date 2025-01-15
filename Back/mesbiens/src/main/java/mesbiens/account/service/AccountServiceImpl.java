package mesbiens.account.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mesbiens.account.dao.AccountDAO;
import mesbiens.account.vo.AccountVO;

@Service
public class AccountServiceImpl implements AccountService {
	@Autowired
	private AccountDAO acctDao;

	// 계좌 정보 가져오기
	@Override
	public List<AccountVO> getAcctInfo() {
		return acctDao.getAcctInfo();
	}

	// 계좌 추가하기
	@Override
	public void addAcct(AccountVO acct) {
		acctDao.addAcct(acct);
	}
	
	
	
	
}
