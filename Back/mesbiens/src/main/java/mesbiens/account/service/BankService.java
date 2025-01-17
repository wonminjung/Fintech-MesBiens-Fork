package mesbiens.account.service;

import java.util.List;

import mesbiens.account.vo.BankInfoVO;

public interface BankService {

	// 모든 뱅크 리스트 가져오기
	List<BankInfoVO> getAllBankList();

}
