package mesbiens.community.post.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mesbiens.community.post.vo.PostCommentVO;
import mesbiens.community.post.vo.PostVO;

@Repository
public interface PostCommentRepository extends JpaRepository<PostCommentVO, Integer> {
	List<PostCommentVO> findByPost(PostVO post);

	// 게시판 내용보기에서 댓글 같이 보기
	List<PostCommentVO> findByPostPostNo(int postNo);

	
	int countByPost_PostNo(int postNo); // 특정 postNo에 대한 댓글 개수 조회
}
