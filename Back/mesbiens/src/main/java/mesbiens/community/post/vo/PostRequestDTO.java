package mesbiens.community.post.vo;

import java.sql.Timestamp;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import mesbiens.community.post.summary.PostListSummary;
import mesbiens.member.vo.MemberVO;

@Getter
@Setter
@ToString

public class PostRequestDTO {

	private int postNo; // 게시글 ID
//	private MemberVO member; // 회원
	private int memberNo; // 회원 ID
	private String memberName; // 회원 글쓴이
	private String postTitle; // 글제목
	private String postCont; // 글내용
	private int postHit; // 조회수
	private int postFile; // 첨부파일 여부
	private String postFileName; // 첨부파일 이름
	private String postFilePath; // 첨부파일 경로
	private String postFileType; // 첨부파일 유형
	private String postFileSize; // 첨부파일 크기
	private String postUploadFile; // 첨부파일 
	private String postFindField; // 게시판 검색 타입 (Title, Content)
	private String postFindName; // 게시판 검색 이름
	private String postPassword; // 게시판 비밀번호
	private String postModify; // 게시글 수정여부
	private Timestamp postDate; // 작성일
	private Timestamp postModifyDate; // 게시글 수정일시
	private int postStartPageRow; // 쪽 시작 행 번호
	private int postEndPageRow; // 쪽 끝 행 번호
	private int commentTotalCount; // 댓글 개수 필드
	
	private MultipartFile uploadFile;
	// 실제 업로드 되어진 파일을 저장. Post.tsx의 <input type="file" name="uploadFile"의 네임파라미터 이름과 멤버변수명(속성명, 필드명)을 같게 한다.
	
	// 기본 생성자 필수
    public PostRequestDTO() {}
    
    public PostRequestDTO(PostListSummary post) {
        this.postNo = post.getPostNo();
        this.postTitle = post.getPostTitle();
        this.memberNo = post.getMemberNo();
        this.memberName = post.getMemberName();
        this.postHit = post.getPostHit();
        this.postFile = post.getPostFile();
        this.postFileName = post.getPostFileName();
        this.postFilePath = post.getPostFilePath();
        this.postFileType = post.getPostFileType();
        
    }
    
    public MemberVO toMemberVO() {
    	MemberVO member = new MemberVO();
    	member.setMemberNo(this.memberNo);
    	member.setMemberName(this.memberName);
    	return member;
    }
}
