package mesbiens.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import mesbiens.member.vo.SnsInfoVO;

public interface SnsInfoRepository extends JpaRepository<SnsInfoVO, Integer> {

	Optional<SnsInfoVO> findBySnsId(String googleId);

}
