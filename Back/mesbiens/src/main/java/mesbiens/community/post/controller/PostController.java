package mesbiens.community.post.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import mesbiens.community.post.service.PostCommentService;
import mesbiens.community.post.service.PostService;
import mesbiens.community.post.vo.PostCommentRequestDTO;
import mesbiens.community.post.vo.PostCommentVO;
import mesbiens.community.post.vo.PostRequestDTO;
import mesbiens.community.post.vo.PostVO;

@RestController // JSON 데이터를 반환하는 컨트롤러로 설정
@RequestMapping("/community") // RESTful API 기본 경로 설정
public class PostController {
/*
	@Autowired
	private PostService postService;
	
	@Autowired
	private PostCommentService postCommentService;
	
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
		    BindingResult bindingResult,
		    @RequestParam(value = "uploadFile", required = false) MultipartFile uploadFile
		) {  
		    HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		    
		    // 유효성 검증 실패 시 처리
		    if (bindingResult.hasErrors()) {
		        StringBuilder errorMsg = new StringBuilder();
		        for (FieldError error : bindingResult.getFieldErrors()) {
		            errorMsg.append(error.getField()).append(": ").append(error.getDefaultMessage()).append("\n");
		        }
		        return ResponseEntity.badRequest().body("입력 오류:\n" + errorMsg.toString());
		    }
		    
        try {
        	if(uploadFile != null && !uploadFile.isEmpty()){
                // 파일이 존재할 때의 로직 (예: postRequest에 파일 정보 세팅 등)
                postRequest.setUploadFile(uploadFile);
            }
        	
        	postService.insertPost(postRequest, request);
            return ResponseEntity.ok("게시글이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 저장 실패: " + e.getMessage());
        }
    }
	
	// 게시판 목록 조회
    @GetMapping("/C_board")
    public ResponseEntity<Map<String, Object>> getPostList(
        @RequestParam(value = "page", defaultValue = "1") int page,
        @RequestParam(value = "limit", defaultValue = "10") int limit
    ) {
        Map<String, Object> response = postService.getPostList(page, limit);
        return ResponseEntity.ok(response);
    }
	
	// 게시글 내용보기(게시글 상세보기)
	@GetMapping("/C_board/{postNo}")
    public ResponseEntity<Map<String, Object>> getPostNo(@PathVariable(name = "postNo") int postNo, 
                                          @RequestParam(value = "state", required = false, defaultValue = "post_cont") String state) {
		PostVO postVO;

        if (state.equals("post_cont")) {
        	postVO = postService.getPostWithViewIncrease(postNo); // 조회수 증가 포함 조회
        } else {
        	postVO = postService.getPostWithoutViewIncrease(postNo); // 조회수 증가 없이 조회
        }
        
        List<PostCommentRequestDTO> postcomments = postCommentService.getCommentsByPostNo(postNo); // 댓글 조회

        Map<String, Object> response = new HashMap<>();
        response.put("post", postVO);
        response.put("postcomments", postcomments);

        return ResponseEntity.ok(response);
    }
	
	// 게시글 내용보기(게시글 조회수 증가)
	@PutMapping("/C_board/{postNo}/view")
    public ResponseEntity<String> increasePostView(@PathVariable(name = "postNo") int postNo) {
        postService.increaseViewCount(postNo);
        return ResponseEntity.ok("조회수 증가 성공");
    }
	
    // 게시글 수정 (파일 업로드 포함)
    @PutMapping("/C_board/{postNo}")
    public ResponseEntity<String> editPostNo(@PathVariable(name = "postNo") int postNo,
								    		@ModelAttribute PostRequestDTO postRequest,  
										    @RequestParam(value = "uploadFile", required = false) MultipartFile uploadFile
											) 
    {  
    	HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        try {
            postService.editPost(postNo, postRequest, request);
            return ResponseEntity.ok("게시글 수정 성공");
        } catch (Exception e) {
        	e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 수정 실패: " + e.getMessage());
        }
    }
    
    // 게시글 삭제
    @DeleteMapping("/C_board/{postNo}")
    public ResponseEntity<String> deletePost(
            @PathVariable(name = "postNo") int postNo,
            @RequestBody Map<String, String> requestbody,
            HttpServletRequest request) {
    	
    	// JSON Data로 받기위함
    	String postPassword = requestbody.get("postPassword");
    	String memberNo = requestbody.get("memberNo");
    	
        try {
            postService.deletePost(postNo, postPassword, request, memberNo);
            return ResponseEntity.ok("게시글이 성공적으로 삭제되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("비밀번호가 일치하지 않습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 삭제 실패: " + e.getMessage());
        }
    }
    
    // 답글 작성
    @PostMapping("/C_board/{postNo}/postComment_Write")
    public ResponseEntity<PostCommentVO> createComment(@PathVariable(name = "postNo") int postNo,
                                                       @RequestBody PostCommentRequestDTO postCommentRequestDTO) {
    	try {
            PostCommentVO savedComment = postCommentService.createComment(postCommentRequestDTO); // DTO 전달
            return ResponseEntity.ok(savedComment); // 성공 시 저장된 댓글 반환

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 게시글 또는 회원이 존재하지 않을 경우
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 서버 에러 처리
        }
    }
    
    // 답글 수정
    @PutMapping("/C_board/{postNo}/{postCommentNo}")
    public ResponseEntity<PostCommentVO> updateComment(
            @PathVariable(name = "postCommentNo") int postCommentNo,
            @RequestBody PostCommentRequestDTO updatedComment) {
        
        PostCommentVO existingComment = postCommentService.getCommentById(postCommentNo);
        if (existingComment == null || !existingComment.getPostCommentPassword().equals(updatedComment.getPostCommentPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        existingComment.setPostCommentContent(updatedComment.getPostCommentContent());
        PostCommentVO savedComment = postCommentService.updateComment(existingComment);
        return ResponseEntity.ok(savedComment);
    }


    // 답글 삭제
    @DeleteMapping("/C_board/{postNo}/{postCommentNo}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable(name = "postCommentNo") int postCommentNo,
            @RequestBody PostCommentRequestDTO comment) {
        
        PostCommentVO existingComment = postCommentService.getCommentById(postCommentNo);
        if (existingComment == null || !existingComment.getPostCommentPassword().equals(comment.getPostCommentPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        postCommentService.deleteComment(postCommentNo);
        return ResponseEntity.noContent().build();
    }


*/
}
