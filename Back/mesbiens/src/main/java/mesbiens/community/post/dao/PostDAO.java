package mesbiens.community.post.dao;

import java.util.List;

import mesbiens.community.post.summary.PostListSummary;
import mesbiens.community.post.vo.PageVO;
import mesbiens.community.post.vo.PostVO;
import mesbiens.member.vo.MemberVO;

public interface PostDAO {

	// 게시판 글쓰기의 경우 DB 연동을 따로 하지 않아 작성 안함
	
	void insertPost(PostVO postVO); // 게시판 저장

	int getRowCount(); // 게시판 목록 (페이징)

	List<PostVO> getPostList(PageVO pageVO); // 게시판 목록 (게시글 목록)

	void increaseViewCount(int postNo); // 조회수 증가

	PostVO getPostById(int postNo); // 게시글 조회

	void updatePost(PostVO postVO); // 게시글 수정

	void deletePost(int postNo); // 게시글 삭제

	PostVO findById(int postNo); // 답변글에서 postNo 찾기

	MemberVO getMemberById(int memberNo); // 답변글에서 memberNo 찾기

}
