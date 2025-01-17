package mesbiens.account.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import mesbiens.account.repository.BankJpaRepository;
import mesbiens.account.vo.BankInfoVO;

@Repository
public class BankDAOImpl implements BankDAO {
	@Autowired
	private BankJpaRepository bankJpaRepository;

	// 모든 뱅크 리스트 가져오기
	@Override
	public List<BankInfoVO> getAllBankList() {
		return bankJpaRepository.findAll();
	}
	
	
}
