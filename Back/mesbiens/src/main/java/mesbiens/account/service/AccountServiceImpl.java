package mesbiens.account.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mesbiens.account.dao.AccountDAO;
import mesbiens.account.dto.AccountResponseDTO;
import mesbiens.account.vo.AccountVO;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {
	@Autowired
	private AccountDAO acctDao;

	// 회원 정보에 맞는 계좌 정보 가져오기
	@Override
	public List<AccountResponseDTO> getAccountList(int memberNo) {
		List<AccountVO> accounts = acctDao.getAccountList(memberNo);
		List<AccountResponseDTO> response = new ArrayList<>();
		
		accounts.stream().forEach((acct) -> {
			AccountResponseDTO res = new AccountResponseDTO(acct);
			
			response.add(res);
		});
		
		return response;
	}

	// 계좌 추가하기
	@Override
	public boolean addAcct(AccountVO acct) {
		AccountVO isSaved = acctDao.addAcct(acct);
		if(isSaved == null) {
			return false;
		}
		
		return true;
	}

	// 계좌 존재 여부 검사
	@Override
	public boolean existsByIdAcct(int accountNo) {
		return acctDao.existsByIdAcct(accountNo);
	}

	// 계좌 삭제하기
	@Override
	public boolean delAcct(int accountNo) {
		// 제거할 계좌가 존재하는지 검색(Primary key 기준)
		if(!acctDao.existsByIdAcct(accountNo)) {
			return false;
		}
		
		int result = acctDao.delAcct(accountNo);
		
		return result > 0;
	}

	
	
}
