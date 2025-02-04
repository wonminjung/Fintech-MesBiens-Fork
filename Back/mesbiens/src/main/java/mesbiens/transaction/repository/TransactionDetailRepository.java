package mesbiens.transaction.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mesbiens.transaction.vo.TransactionDetailVO;

@Repository
public interface TransactionDetailRepository extends JpaRepository<TransactionDetailVO, Integer> {
	
//    // 특정 날짜 조회
//    @Query("SELECT t FROM TransactionDetailVO t WHERE t.transactionCreateAt BETWEEN :startDate AND :endDate")
//    List<TransactionDetailVO> findByTransactionCreateAtBetween(
//        @Param("startDate") Timestamp startDate,
//        @Param("endDate") Timestamp endDate
//    );
	
	
}