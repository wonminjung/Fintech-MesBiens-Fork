package mesbiens.community.post.service;

import java.util.List;
import java.util.Map;


import jakarta.servlet.http.HttpServletRequest;
import mesbiens.community.post.vo.PostRequestDTO;
import mesbiens.community.post.vo.PostVO;

public interface PostService {

	
	Map<String, Object> getPostWritePage(int page); // 게시판 글쓰기
	
	
	void insertPost(PostRequestDTO postRequest, HttpServletRequest request) throws Exception; // 게시판 저장


	Map<String, Object> getPostList(int page, int limit); // 게시판 목록


	PostVO getPostWithViewIncrease(int postNo); // 게시글 내용보기(조회수 증가 게시글 상세 보기)


	PostVO getPostWithoutViewIncrease(int postNo); // 게시글 내용보기(조회수 증가 없이 게시글 상세 보기)

	void increaseViewCount(int postNo); // 조회수 증가


	void editPost(int postNo, PostRequestDTO postRequest, HttpServletRequest request); // 게시글 수정


	void deletePost(int postNo, String delPwd, HttpServletRequest request, String memberNo);

	PostVO getPostById(int postNo);

}
