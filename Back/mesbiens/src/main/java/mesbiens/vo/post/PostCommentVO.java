package mesbiens.vo.post;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
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
@ToString
@Entity
@SequenceGenerator(
			name = "postComment_no_seq_postComment", // 시퀀스 제너레이터 이름
			sequenceName = "postComment_no_seq", // 시퀀스 이름
			initialValue = 1, // 시작값
			allocationSize = 1 // 증감값
		)
@Table(name="postComment")
@EqualsAndHashCode(of="postCommentNo")

public class PostCommentVO {
	
	@Id
	@GeneratedValue(
				strategy = GenerationType.SEQUENCE,
				generator = "postComment_no_seq_postComment"
			)
	private Number postCommentNo;
	
	@ManyToOne // 다대일 관계 설정
	@JoinColumn(name = "PostNo", nullable = false) // 외래키 매핑
	// name = "PostNo": Post 테이블에서 외래키 컬럼 이름.
	// nullable = false: 이 컬럼이 반드시 값이 있어야 함을 지정.
	private PostVO user; // 회원 ID(글쓴이)
	
	/* userVO 외래키 (userVO 작성전까지 주석처리)
	@ManyToOne // 다대일 관계 설정
	@JoinColumn(name = "UserId", nullable = false) // 외래키 매핑
	// name = "UserId": Post 테이블에서 외래키 컬럼 이름.
	// nullable = false: 이 컬럼이 반드시 값이 있어야 함을 지정.
	private UserVO user; // 회원 ID(글쓴이)
	*/
	
	private Number postCommentParentsNo; // 부모댓글
	
	private String postCommentContent; // 댓글 내용
	
	@CreationTimestamp
	private Timestamp postCommentDate; // 댓글 작성 일자
	
	private String postCommentModify; // 댓글 수정여부
	
	@CreationTimestamp
	private Timestamp postCommnetModifyDate; // 댓글 수정일시
	
}
