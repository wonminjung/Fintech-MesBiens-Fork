package mesbiens.community.post.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import mesbiens.community.post.repository.PostRepository;
import mesbiens.community.post.vo.PostVO;
import mesbiens.member.repository.MemberRepository;

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
	public void insertPost(PostVO p) {
		postRepository.save(p); // JPA save 메서드를 사용해 저장
	}
	
	
}
