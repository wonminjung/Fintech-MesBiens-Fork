package mesbiens.community.post.vo;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import mesbiens.member.vo.MemberVO;

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
@Table(name="post_comment")
@EqualsAndHashCode(of="postCommentNo")

public class PostCommentVO {
	
	@Id
	@Column(name="post_comment_no")
	@GeneratedValue(
				strategy = GenerationType.SEQUENCE,
				generator = "postComment_no_seq_postComment"
			)
	private int postCommentNo;
	
	@ManyToOne // 다대일 관계 설정
	@JoinColumn(name = "post_no", referencedColumnName = "post_no", nullable = false) // 외래키 매핑
	// name = "PostNo": Post 테이블에서 외래키 컬럼 이름.
	// nullable = false: 이 컬럼이 반드시 값이 있어야 함을 지정.
	private PostVO postNo; // 게시판 번호
	
	@ManyToOne // 다대일 관계 설정
	@JoinColumn(name = "member_no", referencedColumnName = "member_no", nullable = false) // 외래키 매핑
	// name = "memberId": Post 테이블에서 외래키 컬럼 이름.
	// nullable = false: 이 컬럼이 반드시 값이 있어야 함을 지정.
	private MemberVO memberNo; // 회원 ID(글쓴이)
	
	@Column(name="pstc_parents_no")
	private int postCommentParentsNo; // 부모댓글
	
	@Column(name="pstc_content", nullable = false)
	private String postCommentContent; // 댓글 내용
	
	@CreationTimestamp
	@Column(name="pstc_date", nullable = false)
	private Timestamp postCommentDate; // 댓글 작성 일자
	
	@Column(name="pstc_modify")
	private String postCommentModify; // 댓글 수정여부
	
//	@OneToMany(mappedBy = "PostCommentVO", orphanRemoval = true)
//    private List<PostLogVO> logList = new ArrayList<>();
	
	@CreationTimestamp
	@Column(name="pstc_modify_date")
	private Timestamp postCommnetModifyDate; // 댓글 수정일시
	
}
