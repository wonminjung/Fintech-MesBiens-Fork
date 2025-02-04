package mesbiens.community.post.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mesbiens.community.post.dao.PostCommentDAO;
import mesbiens.community.post.vo.PostCommentVO;

@Service
public class PostCommentServiceImpl implements PostCommentService {

	@Autowired
    private PostCommentDAO postCommentDAO;
	
	@Transactional
	@Override
	public PostCommentVO createComment(PostCommentVO postComment) {
		return postCommentDAO.save(postComment); // 댓글 저장
	}

	@Override
	public PostCommentVO getCommentById(int postCommentNo) {
		return postCommentDAO.findById(postCommentNo); // 댓글 조회
	}

	@Override
	public PostCommentVO updateComment(PostCommentVO postComment) {
		return postCommentDAO.update(postComment); // 댓글 수정
	}

	@Override
	public void deleteComment(int postCommentNo) {
		postCommentDAO.delete(postCommentNo); // 댓글 삭제
	}

}
