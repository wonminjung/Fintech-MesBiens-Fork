package mesbiens.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mesbiens.account.vo.BankInfoVO;

@Repository
public interface BankJpaRepository extends JpaRepository<BankInfoVO, String> {

}
