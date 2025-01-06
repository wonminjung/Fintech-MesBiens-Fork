package mesbiens.dao;

import mesbiens.vo.demovo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface demoRepository extends JpaRepository<demovo, Long> {
	
}
