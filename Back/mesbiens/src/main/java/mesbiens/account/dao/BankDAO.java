package mesbiens.account.dao;

import java.util.List;

import mesbiens.account.vo.BankInfoVO;

public interface BankDAO {

	// 모든 뱅크 리스트 가져오기
	List<BankInfoVO> getAllBankList();

	// 뱅크 이름을 코드로 반환
	String nameToCode(String bankName);
	
}
