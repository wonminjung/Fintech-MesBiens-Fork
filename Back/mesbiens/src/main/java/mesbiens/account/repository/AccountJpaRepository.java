package mesbiens.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import mesbiens.account.vo.AccountVO;

@Repository
public interface AccountJpaRepository extends JpaRepository<AccountVO, Integer> {
	
	@Modifying
	@Transactional
	@Query(value = "delete from account where account.account_no = :accountNo", nativeQuery = true)
	int delAcct(@Param("accountNo") int accountNo);
	
}
