package mesbiens.community.post.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import mesbiens.community.post.repository.PostRepository;
import mesbiens.community.post.vo.PageVO;
import mesbiens.community.post.vo.PostVO;

@Repository
public class PostDAOImpl implements PostDAO {

	@Autowired
	private PostRepository postRepository;
	
	@PersistenceContext
    private EntityManager entityManager;
	// JPA 사용 → entityManager.persist(post);로 데이터 저장.
	
//	@Autowired
//	private MemberRepository memberRepository;

	
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
	public int getRowCount(PageVO p) {
		// 검색 필터가 있을 경우 처리
        String findField = p.getFindField();
        String findName = p.getFindName();
        
        if (findName == null || findName.isEmpty()) {
            return (int) postRepository.count(); // 전체 개수 조회
        } else {
            return (int) postRepository.countByFindField(findField, findName); // 검색된 개수 조회
        }
	}

	// 게시판 목록
	@Override
	 public List<PostVO> getPostList(PageVO pageVO) {
        int page = pageVO.getPage() - 1; // JPA Pageable은 0부터 시작
        int size = pageVO.getEndrow() - pageVO.getStartrow() + 1;
        
        // page가 0보다 작은지 검증
        if (page < 0) {
            page = 0; // 페이지 번호를 0으로 보정
        }
        
        // Spring Data JPA에서 페이징 처리와 정렬을 설정
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "postNo"));

        return postRepository.searchPosts(pageVO.getFindField(), pageVO.getFindName(), pageable).getContent();
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

	
	@Override
	public PostVO getPostById(int postNo) {
		return postRepository.findById(postNo)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다: " + postNo));
	}

	@Override
	public void updatePost(PostVO postVO) {
		postRepository.save(postVO); // JPA에서 업데이트 처리 (save()는 자동으로 수정 적용)		
	}	
	
}
