package mesbiens.community.post.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mesbiens.community.post.dao.PostCommentDAO;
import mesbiens.community.post.dao.PostDAO;
import mesbiens.community.post.vo.PostCommentRequestDTO;
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
//	@Override
//	@Transactional
//	public PostCommentVO createComment(PostCommentVO comment) {
//	    // ✅ 부모 테이블(Post, Member) 존재 여부 검증
//	    PostVO post = postDAO.getPostById(comment.getPost().getPostNo());
//	    if (post == null) {
//	        throw new IllegalArgumentException("게시글이 존재하지 않습니다.");
//	    }
//
//	    MemberVO member = postDAO.getMemberById(comment.getMember().getMemberNo());
//	    if (member == null) {
//	        throw new IllegalArgumentException("회원 정보가 존재하지 않습니다.");
//	    }
//
//	    comment.setPost(post);
//	    comment.setMember(member);
//
//	    return postCommentDAO.saveComment(comment); // DAO를 통해 저장
//	}
	
	@Override
	@Transactional
	public PostCommentVO createComment(PostCommentRequestDTO commentRequest) {
	    System.out.println("🚀 댓글 작성 시작");
	    System.out.println("📌 postNo: " + commentRequest.getPostNo());
	    System.out.println("📌 memberNo: " + commentRequest.getMemberNo());
	    // ✅ 부모 테이블(Post, Member) 존재 여부 검증
	    PostVO post = postDAO.getPostById(commentRequest.getPostNo());
	    if (post == null) {
	        throw new IllegalArgumentException("게시글이 존재하지 않습니다.");
	    }

	    MemberVO member = postDAO.getMemberById(commentRequest.getMemberNo());
	    if (member == null) {
	        throw new IllegalArgumentException("회원 정보가 존재하지 않습니다.");
	    }

	    // DTO → VO 변환
	    PostCommentVO comment = new PostCommentVO();
	    comment.setPost(post);
	    comment.setMember(member);
	    comment.setPostCommentContent(commentRequest.getPostCommentContent());
	    comment.setPostCommentPassword(commentRequest.getPostCommentPassword());

	    return postCommentDAO.saveComment(comment);
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
	public List<PostCommentRequestDTO> getCommentsByPostNo(int postNo) {
	    List<PostCommentVO> comments = postCommentDAO.findCommentsByPostNo(postNo);

	    // 🔹 VO → DTO 변환
	    return comments.stream().map(comment -> {
	        PostCommentRequestDTO dto = new PostCommentRequestDTO();
	        dto.setPostCommentNo(comment.getPostCommentNo());
	        dto.setPostNo(comment.getPost().getPostNo()); // PostVO 대신 postNo 사용
	        dto.setMemberNo(comment.getMember().getMemberNo()); // MemberVO 대신 memberNo 사용
	        dto.setPostCommentContent(comment.getPostCommentContent());
	        dto.setPostCommentPassword(comment.getPostCommentPassword());
	        return dto;
	    }).collect(Collectors.toList());
	}


}
