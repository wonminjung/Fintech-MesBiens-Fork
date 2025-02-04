package mesbiens.community.post.vo;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString(exclude = "post") // 순환 참조 방지
@Entity
@Table(name="post_comment")
@EqualsAndHashCode(of="postCommentNo")

public class PostCommentVO {
	
	@Id
	@Column(name="post_comment_no")
	@GeneratedValue(
				strategy = GenerationType.SEQUENCE,
				generator = "postComment_no_seq_postComment"
			)
	@SequenceGenerator(
			name = "postComment_no_seq_postComment", // 시퀀스 제너레이터 이름
			sequenceName = "postComment_no_seq", // 시퀀스 이름
			initialValue = 1, // 시작값
			allocationSize = 1 // 증감값
		)
	private int postCommentNo;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE, optional = false)
    @JoinColumn(name = "post_no", referencedColumnName = "post_no", nullable = false)
	@JsonBackReference // 무한 재귀 방지(직렬화 시 제외할 데이터)
    private PostVO post;  // 외래 키 매핑
	// 게시판 번호
	// name = "PostNo": Post 테이블에서 외래키 컬럼 이름.
	// nullable = false: 이 컬럼이 반드시 값이 있어야 함을 지정.
	
//	@JoinColumn(name = "member_no", referencedColumnName = "member_no", nullable = false) // 외래키 매핑
//	// name = "memberId": Post 테이블에서 외래키 컬럼 이름.
//	// nullable = false: 이 컬럼이 반드시 값이 있어야 함을 지정.
//	private int memberNo; // 회원 ID(글쓴이)
	@Column(name = "member_no", nullable = false) // 수정된 부분
    private int memberNo;
	
	@Column(name="pstc_content", nullable = false)
	private String postCommentContent; // 댓글 내용
	
	@Column(name="pstc_Password", nullable = false)
	private String postCommentPassword;
	
	@CreationTimestamp
	@Column(name="pstc_date", nullable = false)
	private Timestamp postCommentDate; // 댓글 작성 일자
	
}
