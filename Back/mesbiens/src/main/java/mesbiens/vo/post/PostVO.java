package mesbiens.vo.post;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
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
			name="post_no_seq_post", // 시퀀스 제너레이터 이름
			sequenceName = "post_no_seq", // 시퀀스 이름
			initialValue = 1, // 시작값
			allocationSize = 1 // 증감값
		)
@Table(name="post")
@EqualsAndHashCode(of="postNo")


// 게시판 엔티티빈 클래스
public class PostVO {
	
	@Id // 구분키인 식별키로 지정
	@GeneratedValue(
				strategy = GenerationType.SEQUENCE, // 사용할 전략을 시퀀스로 선택
				generator = "post_no_seq_post" // 시퀀스 생성기에 설정해 놓은 제너레이터 이름
			)
	private Number postNo; // 게시글 ID
	
	/* userVO 외래키 (userVO 작성전까지 주석처리)
	@ManyToOne // 다대일 관계 설정
	@JoinColumn(name = "UserId", nullable = false) // 외래키 매핑
	// name = "UserId": Post 테이블에서 외래키 컬럼 이름.
	// nullable = false: 이 컬럼이 반드시 값이 있어야 함을 지정.
	private UserVO user; // 회원 ID(글쓴이)
	*/
	
	private String postTitle; // 글제목
	
	@Column(length = 4000)
	private String postCont; // 글내용
	
	private Number postHit; // 조회수
	
	private String posfFileName; // 첨부파일 이름
	private String postFilepath; // 첨부파일 경로
	private String postFileType; // 첨부파일 유형
	private String postFileSize; // 첨부파일 크기
	
	private String postModify; // 게시글 수정여부
		
	@CreationTimestamp // 등록시점의 날짜와 시간값을 사용하기 위한 에노테이션
	private Timestamp postDate; // 작성일
	
	@CreationTimestamp
	private Timestamp postModifyDate; // 게시글 수정일시
	
	private Number postStartPageRow; // 쪽 시작 행 번호
	private Number postEndPageRow; // 쪽 끝 행 번호
	
}
	