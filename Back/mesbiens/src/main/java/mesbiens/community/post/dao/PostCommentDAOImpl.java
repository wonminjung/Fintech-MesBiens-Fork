package mesbiens.community.post.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import mesbiens.community.post.repository.PostCommentRepository;
import mesbiens.community.post.vo.PostCommentVO;

@Repository
public class PostCommentDAOImpl implements PostCommentDAO {
	
	@Autowired
	private PostCommentRepository postCommentRepository;

	@Transactional
	@Override
    public PostCommentVO saveComment(PostCommentVO comment) {
        return postCommentRepository.save(comment);
    }

	@Override
	public PostCommentVO findById(int postCommentNo) {
		return postCommentRepository.findById(postCommentNo).orElse(null); // 댓글 조회
	}

	@Override
	public PostCommentVO update(PostCommentVO postComment) {
		return postCommentRepository.save(postComment); // 댓글 수정
	}

	@Override
	public void delete(int postCommentNo) {
		postCommentRepository.deleteById(postCommentNo); // 댓글 삭제
	}
}
