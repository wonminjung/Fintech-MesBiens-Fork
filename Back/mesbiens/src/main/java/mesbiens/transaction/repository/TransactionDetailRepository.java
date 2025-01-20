package mesbiens.transaction.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import mesbiens.transaction.vo.TransactionDetailVO;

@Repository
public interface TransactionDetailRepository extends JpaRepository<TransactionDetailVO, Integer> {
    
}    
