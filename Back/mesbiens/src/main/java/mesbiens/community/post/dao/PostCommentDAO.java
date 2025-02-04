package mesbiens.community.post.dao;

import java.util.List;

import mesbiens.community.post.vo.PostCommentVO;

public interface PostCommentDAO {

	PostCommentVO save(PostCommentVO postComment);

	PostCommentVO findById(int postCommentNo);

	PostCommentVO update(PostCommentVO postComment);

	void delete(int postCommentNo);

}
