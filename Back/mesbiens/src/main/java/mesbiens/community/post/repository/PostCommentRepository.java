package mesbiens.community.post.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mesbiens.community.post.vo.PostCommentVO;
import mesbiens.community.post.vo.PostVO;

@Repository
public interface PostCommentRepository extends JpaRepository<PostCommentVO, Integer> {
	List<PostCommentVO> findByPost(PostVO post);

}
