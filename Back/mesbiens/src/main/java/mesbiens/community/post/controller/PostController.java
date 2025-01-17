package mesbiens.community.post.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mesbiens.community.post.service.PostService;
import mesbiens.community.post.vo.PostVO;
import mesbiens.community.post.vo.PostVO2;

@RestController // JSON 데이터를 반환하는 컨트롤러로 설정
@RequestMapping("/community/*") // RESTful API 기본 경로 설정
public class PostController {
	
	@Autowired
	private PostService postService;
	
	// 게시판 글쓰기
	@GetMapping("/C_board/C_boardWrite")
    public ResponseEntity<Map<String, Object>> postWrite(@RequestParam(defaultValue = "1") int page) {
		// HttpServletRequest를 직접 사용하지 않고, @RequestParam을 통해 page 값을 처리 기본값을 1로 설정 (defaultValue = "1")

		Map<String, Object> response = postService.getPostWritePage(page);     
		// Map<String, Object>를 활용하여 JSON 형태의 응답을 생성
		// PostService.getPostWritePage(page) 호출하여 서비스 계층에서 데이터 처리.
	    
        return ResponseEntity.ok(response);
        // ResponseEntity.ok(response)를 사용하여 HTTP 상태 코드 200과 함께 JSON데이터를 반환
	}

	
	// 게시판 저장
	@PostMapping("/C_board/C_boardWrite_ok")
    public ResponseEntity<String> postWrite(
            @ModelAttribute PostVO post,
            @ModelAttribute PostVO2 post2,
            HttpServletRequest request) {

        try {
            postService.insertPost(post, post2, request);
            // postService.insertBbs(post, post2, request); 호출하여 서비스 계층에서 파일 업로드와 DB 저장 처리.
            return ResponseEntity.ok("게시글이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 저장 실패: " + e.getMessage());
            // ResponseEntity<String> 반환 → 성공/실패 메시지를 JSON으로 반환.
        }
    }
	
	// 게시판 목록
	@GetMapping("/C_board/")
	public ResponseEntity<Map<String, Object>> getBbsList(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "find_field", required = false) String findField,
            @RequestParam(value = "find_name", required = false) String findName) {

        // 서비스에서 페이징 및 검색 처리
        Map<String, Object> response = postService.getPostList(page, findField, findName);
        return ResponseEntity.ok(response);
        // ResponseEntity.ok(response)를 사용하여 HTTP 상태 코드 200과 함께 JSON데이터를 반환
    }
	
}
