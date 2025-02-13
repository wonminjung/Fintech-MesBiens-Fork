package mesbiens.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mesbiens.account.vo.BankInfoVO;

@Repository
public interface BankJpaRepository extends JpaRepository<BankInfoVO, String> {
	
	// 뱅크 이름을 코드로 반환
	public BankInfoVO findByBankName(@Param("bankName") String bankName);

	
	
}
