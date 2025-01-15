package mesbiens.community.post.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mesbiens.community.post.dao.PostDAO;
import mesbiens.community.post.vo.PageVO;
import mesbiens.community.post.vo.PostVO;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostDAO postDAO;

	@Override 
	public void insertPost(PostVO p) {
		
		this.postDAO.insertPost(p); // DAO 메소드 호출
		
	}

	@Override
	public long getTotalCount() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<PostVO> getPostList(PageVO p) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}
