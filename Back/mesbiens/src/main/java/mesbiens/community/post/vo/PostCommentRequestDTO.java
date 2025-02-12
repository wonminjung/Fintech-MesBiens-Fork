package mesbiens.community.post.vo;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class PostCommentRequestDTO {
	
	private int postCommentNo;
	private int postNo; // 게시글 ID
	private int memberNo; // 회원 ID
	private String memberName; // 회원 이름
	private String postCommentContent; // 댓글 내용
	private String postCommentPassword;
	private Timestamp postCommentDate; // 댓글 작성 일자
}
