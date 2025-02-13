package mesbiens.account.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mesbiens.account.dao.BankDAO;
import mesbiens.account.vo.BankInfoVO;

@Service
public class BankServiceImpl implements BankService {
	@Autowired
	private BankDAO bankDao;

	// 모든 뱅크 리스트 가져오기
	@Override
	public List<BankInfoVO> getAllBankList() {
		return bankDao.getAllBankList();
	}

	// 뱅크 이름을 코드로 반환
	@Override
	public String nameToCode(String bankName) {
		return bankDao.nameToCode(bankName);
	}
	
	
	
}
