package mesbiens.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mesbiens.account.vo.AccountVO;

@Repository
public interface AccountJpaRepository extends JpaRepository<AccountVO, Integer> {
	
}
