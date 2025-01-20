package mesbiens.community.post.vo;

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
import mesbiens.member.vo.MemberVO;

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
	@Column(name="post_no")
	@GeneratedValue(
				strategy = GenerationType.SEQUENCE, // 사용할 전략을 시퀀스로 선택
				generator = "post_no_seq_post" // 시퀀스 생성기에 설정해 놓은 제너레이터 이름
			)
	private int postNo; // 게시글 ID
	
	@ManyToOne // 다대일 관계 설정
	@JoinColumn(name = "member_no", referencedColumnName = "member_no") // 외래키 매핑
	// name = "memberId": Post 테이블에서 외래키 컬럼 이름.
	// nullable = false: 이 컬럼이 반드시 값이 있어야 함을 지정.
	private MemberVO memberNo; // 회원 ID(글쓴이)
	
	@Column(name="post_title")
	private String postTitle; // 글제목
	
	@Column(name="post_cont", length = 4000)
	private String postCont; // 글내용
	
	@Column(name="post_hit")
	private int postHit; // 조회수
	
	@Column(name="post_file")
	private String postFile;
	@Column(name="post_file_name")
	private String postFileName; // 첨부파일 이름
	@Column(name="post_file_path")
	private String postFilePath; // 첨부파일 경로
	@Column(name="post_file_type")
	private String postFileType; // 첨부파일 유형
	@Column(name="post_file_size")
	private String postFileSize; // 첨부파일
	
	@Column(name="post_upload_file")
	private String postUploadFile;
	
	@Column(name="post_find_field")
	private String findField; // 게시판 검색 타입 (Title, Content)
	@Column(name="post_find_name")
	private String findName; // 게시판 검색 이름
	
	@Column(name="post_modify")
	private String postModify; // 게시글 수정여부
		
	@CreationTimestamp // 등록시점의 날짜와 시간값을 사용하기 위한 에노테이션
	@Column(name="post_date", nullable = false)
	private Timestamp postDate; // 작성일
	
	@Column(name="post_modify_date")
	@CreationTimestamp
	private Timestamp postModifyDate; // 게시글 수정일시
	
	
//	@OneToMany(mappedBy = "postVO", orphanRemoval = true)
//    private List<PostLogVO> logList = new ArrayList<>();
	
	
	private int postStartPageRow; // 쪽 시작 행 번호
	private int postEndPageRow; // 쪽 끝 행 번호
	
}
	