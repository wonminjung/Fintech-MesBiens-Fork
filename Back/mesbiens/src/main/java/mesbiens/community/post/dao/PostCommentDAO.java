package mesbiens.community.post.dao;

import java.util.List;

import mesbiens.community.post.vo.PostCommentVO;

public interface PostCommentDAO {

	PostCommentVO saveComment(PostCommentVO comment);

	PostCommentVO findById(int postCommentNo);

	PostCommentVO update(PostCommentVO postComment);

	void delete(int postCommentNo);

	List<PostCommentVO> findCommentsByPostNo(int postNo);


}
