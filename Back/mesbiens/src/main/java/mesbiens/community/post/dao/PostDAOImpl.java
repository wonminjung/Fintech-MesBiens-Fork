package mesbiens.community.post.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import mesbiens.community.post.repository.PostRepository;
import mesbiens.community.post.summary.PostListSummary;
import mesbiens.community.post.vo.PageVO;
import mesbiens.community.post.vo.PostVO;
import mesbiens.member.repository.MemberRepository;
import mesbiens.member.vo.MemberVO;

@Repository
public class PostDAOImpl implements PostDAO {

	@Autowired
	private PostRepository postRepository;

	@PersistenceContext
	private EntityManager entityManager;
	// JPA 사용 → entityManager.persist(post);로 데이터 저장.

	@Autowired
	private MemberRepository memberRepository;

	// 게시판 글쓰기의 경우 DB 연동을 따로 하지 않아 작성 안함

	// 게시판 저장
	@Override
	public void insertPost(PostVO postVO) {

//		long postSeq_no = postRepository.getPostNextSequenceValue();
//	    
//	    // DB에 해당 postNo가 이미 존재하는지 확인
//	    if (postRepository.existsById((int) postSeq_no)) {
//	        throw new IllegalStateException("중복된 postNo: " + postSeq_no);
//	    }
//	    
//	    postVO.setPostNo((int) postSeq_no);

		postRepository.save(postVO); // JPA save 메서드를 사용해 저장
	}

	// 게시판 목록
	@Override
	public int getRowCount() {
		return (int) postRepository.count();
	}

	// 게시판 목록
	@Override
	public List<PostVO> getPostList(PageVO pageVO) {
		Pageable pageable = PageRequest.of(pageVO.getStartrow() / (pageVO.getEndrow() - pageVO.getStartrow()),
				pageVO.getEndrow() - pageVO.getStartrow(), Sort.by(Sort.Direction.DESC, "postNo"));

		return postRepository.findAllPosts(pageable).getContent();
	}

	// 조회수 상승
	@Override
	public void increaseViewCount(int postNo) {
		PostVO postVO = postRepository.findById(postNo)
				.orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다: " + postNo));
		// .orElseThrow() postNO 를 찾이 못했을 경우 RuntimeException 에러발생
		postVO.setPostHit(postVO.getPostHit() + 1);
		postRepository.save(postVO); // 변경된 조회수 저장
	}

	// postNo 가져오기
	@Override
	public PostVO getPostById(int postNo) {
		return postRepository.findById(postNo).orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다: " + postNo));
	}

	// 게시글 수정
	@Override
	public void updatePost(PostVO postVO) {
		postRepository.save(postVO); // JPA에서 업데이트 처리 (save()는 자동으로 수정 적용)
	}

	// 게시글 삭제
	@Override
	public void deletePost(int postNo) {
		Optional<PostVO> postOptional = postRepository.findById(postNo);
		if (postOptional.isPresent()) {
			postRepository.delete(postOptional.get());
		} else {
			throw new RuntimeException("게시글을 찾을 수 없습니다: " + postNo);
		}
	}

	// 댓글 작성을 위한 postNo 가져오기
	@Override
	public PostVO findById(int postNo) {
//		System.out.println(postRepository.findById(postNo));
		return postRepository.findById(postNo)
				.orElseThrow(() -> new EntityNotFoundException("Post not found with ID: " + postNo));
	}

	@Override
	public MemberVO getMemberById(int memberNo) {
		return memberRepository.findById(memberNo).orElseThrow(() -> new IllegalArgumentException("회원 정보를 찾을 수 없습니다."));
	}

}
