package mesbiens.transaction.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mesbiens.transaction.dto.RecentTransactionResponseDTO;
import mesbiens.transaction.vo.TransactionDetailVO;

@Repository
public interface TransactionDetailRepository extends JpaRepository<TransactionDetailVO, Integer> {
	
	// 시작날짜와 종료날짜 사이의 최근 거래내역 조회
	@Query(JpaQuery.RECENT_QUERY)
	List<RecentTransactionResponseDTO> findRecentList(@Param("memberNo") int memberNo, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
	
}