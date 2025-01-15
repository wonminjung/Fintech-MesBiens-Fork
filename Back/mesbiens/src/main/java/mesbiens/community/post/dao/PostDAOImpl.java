package mesbiens.community.post.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import mesbiens.community.post.repository.PostRepository;
import mesbiens.community.post.vo.PostVO;

@Repository
public class PostDAOImpl implements PostDAO {

	@Autowired
	private PostRepository postRepository;

	@Override
	public void insertPost(PostVO p) {
		
		postRepository.save(p); // JPA save 메서드를 사용해 저장
	}
	
	
}
