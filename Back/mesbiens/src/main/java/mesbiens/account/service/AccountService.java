package mesbiens.account.service;

import java.util.List;

import mesbiens.account.dto.AccountResponseDTO;
import mesbiens.account.vo.AccountVO;

public interface AccountService {

	// 회원 정보에 맞는 계좌 정보 가져오기
	List<AccountResponseDTO> getAccountList(int memberNo);

	// 계좌 추가하기
	boolean addAcct(AccountVO acct);
	
	// 계좌 존재하는지 검색
	boolean existsByIdAcct(int accountNo);

	// 계좌 삭제하기
	boolean delAcct(int accountNo);



}
