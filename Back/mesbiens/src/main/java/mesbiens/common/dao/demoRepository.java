package mesbiens.common.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mesbiens.common.vo.demovo;

@Repository
public interface demoRepository extends JpaRepository<demovo, Long> {
	
}
