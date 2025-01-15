package mesbiens.community.post.service;

import java.util.List;

import mesbiens.community.post.vo.PageVO;
import mesbiens.community.post.vo.PostVO;

public interface PostService {

	void insertPost(PostVO p); // 게시판 저장

	long getTotalCount(); // 게시판 게시글개수 확인

	List<PostVO> getPostList(PageVO p); // 게시판 목록 확인



}
