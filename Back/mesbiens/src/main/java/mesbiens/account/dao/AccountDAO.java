package mesbiens.account.dao;

import java.util.List;

import mesbiens.account.vo.AccountVO;

public interface AccountDAO {

	// 회원 정보에 맞는 계좌 정보 가져오기
	List<AccountVO> getAccountList(int memberNo);

	// 계좌 추가하기
	AccountVO addAcct(AccountVO acct);

	// 제거할 계좌가 존재하는지 검색(Primary key 기준)
	boolean existsByIdAcct(int accountNo);

	// 계좌 삭제하기
	int delAcct(int accountNo);

	// 계좌번호 존재하는지 검색
	boolean existsByAcctNumber(String accountNumber);

	// 계좌번호를 기준으로 계좌 PK 가져오기
	int acctNumToAcctNo(String accountNumber);



}
