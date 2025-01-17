package mesbiens.community.post.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import mesbiens.community.post.vo.PostVO;
import mesbiens.community.post.vo.PostVO2;

public interface PostService {

	
	Map<String, Object> getPostWritePage(int page); // 게시판 글쓰기
	
	
	void insertPost(PostVO post, PostVO2 post2, HttpServletRequest request) throws Exception; // 게시판 저장


	Map<String, Object> getPostList(int page, String findField, String findName); // 게시판 목록





}
