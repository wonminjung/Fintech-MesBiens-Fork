package mesbiens.account.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import mesbiens.account.dao.AccountDAO;
import mesbiens.account.dto.AccountResponseDTO;
import mesbiens.account.dto.AddAccountRequestDTO;
import mesbiens.account.vo.AccountVO;
import mesbiens.account.vo.BankInfoVO;
import mesbiens.member.vo.MemberVO;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {
	@Autowired
	private AccountDAO acctDao;
	
	@Autowired
	private BankService bankService;
	
	@PersistenceContext
	private EntityManager entityManager;

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
	public boolean addAcct(AddAccountRequestDTO acct) {
		String bankCode = bankService.nameToCode(acct.getBankName());
		BankInfoVO bank = entityManager.getReference(BankInfoVO.class, bankCode);
		MemberVO member = entityManager.getReference(MemberVO.class, acct.getMemberNo());
		
		AccountVO addAcct = new AccountVO();
		addAcct.setBankCode(bank);
		addAcct.setAccountNumber(acct.getAccountNumber());
		addAcct.setMemberNo(member);
		addAcct.setAccountPassword(acct.getAccountPassword());
		
		AccountVO isSaved = acctDao.addAcct(addAcct);
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

	// 계좌번호 존재하는지 검색
	@Override
	public boolean existsByAcctNumber(String accountNumber) {
		return acctDao.existsByAcctNumber(accountNumber);
	}

	// 계좌번호를 기준으로 계좌 PK 가져오기
	@Override
	public int acctNumToAcctNo(String accountNumber) {
		return acctDao.acctNumToAcctNo(accountNumber);
	}
	
	
}
