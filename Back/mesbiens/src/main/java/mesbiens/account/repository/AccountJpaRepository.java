package mesbiens.account.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import mesbiens.account.vo.AccountVO;

@Repository
public interface AccountJpaRepository extends JpaRepository<AccountVO, Integer> {
	
	// 회원 정보에 맞는 계좌 정보 가져오기
	@Query(value = "select * from account where member_no = :memberNo", nativeQuery = true)
	public List<AccountVO> findByMemNo(@Param("memberNo") int memberNo);
	
	// 계좌 삭제
	@Modifying
	@Transactional
	@Query(value = "delete from account where account.account_no = :accountNo", nativeQuery = true)
	public int delAcct(@Param("accountNo") int accountNo);
	
	// 계좌번호 존재하는지 검색
	public AccountVO findByAccountNumber(@Param("accountNumber") String accountNumber);
	
}
