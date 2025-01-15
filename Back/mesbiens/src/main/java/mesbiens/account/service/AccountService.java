package mesbiens.account.service;

import java.util.List;

import mesbiens.account.vo.AccountVO;

public interface AccountService {

	// 계좌 정보 가져오기
	List<AccountVO> getAcctInfo();

	// 계좌 추가하기
	void addAcct(AccountVO acct);

}
