package mesbiens.community.post.dao;

import mesbiens.community.post.vo.PostVO;

public interface PostDAO {

	// 게시판 글쓰기의 경우 DB 연동을 따로 하지 않아 작성 안함
	
	void insertPost(PostVO p); // 게시판 저장

	

}
