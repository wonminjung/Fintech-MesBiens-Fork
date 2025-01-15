package mesbiens.community.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mesbiens.community.post.vo.PostVO;

@Repository
public interface PostRepository extends JpaRepository<PostVO, Integer> {
	
	// JpaRepository를 상속받아 기본 CRUD 메서드 제공
}
