package mesbiens.community.post.vo;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter

public class PostVO2 {
	
	private MultipartFile uploadFile;
	// 실제 업로드 되어진 파일을 저장. Post.tsx의 <input type="file" name="uploadFile"의 네임파라미터 이름과 멤버변수명(속성명, 필드명)을 같게 한다.
}
