package mesbiens.community.post.controller;

import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import mesbiens.community.post.service.PostService;
import mesbiens.community.post.vo.PostRequestDTO;
import mesbiens.community.post.vo.PostVO;

@RestController // JSON 데이터를 반환하는 컨트롤러로 설정
@RequestMapping("/community") // RESTful API 기본 경로 설정
public class PostController {

	@Autowired
	private PostService postService;
	
	// 게시판 글쓰기
	@GetMapping("/C_board/C_boardWrite")
    public ResponseEntity<Map<String, Object>> getPostWrite(@RequestParam(value = "page", defaultValue = "1") int page) {
		// HttpServletRequest를 직접 사용하지 않고, @RequestParam을 통해 page 값을 처리 기본값을 1로 설정 (defaultValue = "1")

		Map<String, Object> response = postService.getPostWritePage(page);     
		// Map<String, Object>를 활용하여 JSON 형태의 응답을 생성
		// PostService.getPostWritePage(page) 호출하여 서비스 계층에서 데이터 처리.
	    
        return ResponseEntity.ok(response);
        // ResponseEntity.ok(response)를 사용하여 HTTP 상태 코드 200과 함께 JSON데이터를 반환
	}

	
	// 게시판 저장
	@PostMapping("/C_board/C_boardWrite_ok")
	public ResponseEntity<String> postPostWrite(
		    @ModelAttribute PostRequestDTO postRequest,  
		    @RequestParam(value = "uploadFile", required = false) MultipartFile uploadFile
		) {  
		    HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		    

        try {
        	postService.insertPost(postRequest, request);
            return ResponseEntity.ok("게시글이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 저장 실패: " + e.getMessage());
        }
    }
	
	// 게시판 목록
	@GetMapping("/C_board")
	public ResponseEntity<Map<String, Object>> getPostList(
	@RequestParam(value = "page", defaultValue = "1") int page,
    @RequestParam(value = "limit", defaultValue = "10") int limit) {

		Map<String, Object> response = postService.getPostList(page, limit);
        return ResponseEntity.ok(response);
	}
	
	// 게시글 내용보기(게시글 상세보기)
	@GetMapping("/C_board/{postNo}")
    public ResponseEntity<PostVO> getPostNo(@PathVariable int postNo, 
                                          @RequestParam(value = "state", required = false, defaultValue = "post_cont") String state) {
		PostVO postVO;

        if (state.equals("post_cont")) {
        	postVO = postService.getPostWithViewIncrease(postNo); // 조회수 증가 포함 조회
        } else {
        	postVO = postService.getPostWithoutViewIncrease(postNo); // 조회수 증가 없이 조회
        }

        return ResponseEntity.ok(postVO);
    }
	
	// 게시글 내용보기(게시글 조회수 증가)
	@PutMapping("/C_board/{postNo}/view")
    public ResponseEntity<String> increasePostView(@PathVariable int postNo) {
        postService.increaseViewCount(postNo);
        return ResponseEntity.ok("조회수 증가 성공");
    }
	
    // 게시글 수정 (파일 업로드 포함)
    @PutMapping("/C_board/{postNo}")
    public ResponseEntity<String> editPostNo(@PathVariable int postNo,
//								    	   @RequestPart("postRequest") PostRequestDTO postRequest,
    									   @RequestParam(value = "postRequest", required = false) PostRequestDTO postRequest,
								    	   @RequestPart(value = "uploadFile", required = false) MultipartFile uploadFile,
                                           HttpServletRequest request) {
        try {
            postService.editPost(postNo, postRequest, uploadFile, request);
            return ResponseEntity.ok("게시글 수정 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 수정 실패: " + e.getMessage());
        }
    }
	
}
