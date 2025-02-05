package mesbiens.community.post.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mesbiens.community.post.dao.PostCommentDAO;
import mesbiens.community.post.dao.PostDAO;
import mesbiens.community.post.vo.PostCommentVO;
import mesbiens.community.post.vo.PostVO;
import mesbiens.member.repository.MemberRepository;
import mesbiens.member.vo.MemberVO;

@Service
public class PostCommentServiceImpl implements PostCommentService {

	@Autowired
    private PostCommentDAO postCommentDAO;
	
	@Autowired
	private PostDAO postDAO;
	
	// 답글 작성
	@Override
	@Transactional
	public PostCommentVO createComment(PostCommentVO comment) {
	    // ✅ 부모 테이블(Post, Member) 존재 여부 검증
	    PostVO post = postDAO.getPostById(comment.getPost().getPostNo());
	    if (post == null) {
	        throw new IllegalArgumentException("게시글이 존재하지 않습니다.");
	    }

	    MemberVO member = postDAO.getMemberById(comment.getMember().getMemberNo());
	    if (member == null) {
	        throw new IllegalArgumentException("회원 정보가 존재하지 않습니다.");
	    }

	    comment.setPost(post);
	    comment.setMember(member);

	    return postCommentDAO.saveComment(comment); // DAO를 통해 저장
	}

	// 댓글 조회
	@Override
	public PostCommentVO getCommentById(int postCommentNo) {
		return postCommentDAO.findById(postCommentNo); 
	}

	// 댓글 수정
	@Override
	public PostCommentVO updateComment(PostCommentVO postComment) {
		return postCommentDAO.update(postComment); 
	}

	// 댓글 삭제
	@Override
	public void deleteComment(int postCommentNo) {
		postCommentDAO.delete(postCommentNo); 
	}

	// 게시판 상세보기에 답글 보기
	@Override
	public List<PostCommentVO> getCommentsByPostNo(int postNo) {
		return postCommentDAO.findCommentsByPostNo(postNo);
	}

}
