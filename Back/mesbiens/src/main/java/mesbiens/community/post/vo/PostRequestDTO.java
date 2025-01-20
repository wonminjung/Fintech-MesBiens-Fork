package mesbiens.community.post.vo;

import java.sql.Timestamp;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import mesbiens.member.vo.MemberVO;

@Getter
@Setter
@ToString

public class PostRequestDTO {

	private int postNo; // 게시글 ID
	private MemberVO memberNo; // 회원 ID(글쓴이)
	private String postTitle; // 글제목
	private String postCont; // 글내용
	private int postHit; // 조회수
	private String postFile;
	private String postFileName; // 첨부파일 이름
	private String postFilePath; // 첨부파일 경로
	private String postFileType; // 첨부파일 유형
	private String postFileSize; // 첨부파일
	private String findField; // 게시판 검색 타입 (Title, Content)
	private String findName; // 게시판 검색 이름
	private String postModify; // 게시글 수정여부
	private Timestamp postDate; // 작성일
	private Timestamp postModifyDate; // 게시글 수정일시
	private int postStartPageRow; // 쪽 시작 행 번호
	private int postEndPageRow; // 쪽 끝 행 번호
	
	private MultipartFile uploadFile;
	// 실제 업로드 되어진 파일을 저장. Post.tsx의 <input type="file" name="uploadFile"의 네임파라미터 이름과 멤버변수명(속성명, 필드명)을 같게 한다.
	
	// 기본 생성자 필수
    public PostRequestDTO() {}
}
