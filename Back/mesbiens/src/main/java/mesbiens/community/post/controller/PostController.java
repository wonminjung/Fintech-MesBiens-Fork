package mesbiens.community.post.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mesbiens.community.post.service.PostService;
import mesbiens.community.post.vo.PageVO;
import mesbiens.community.post.vo.PostVO;

@RestController // JSON 데이터를 반환하는 컨트롤러로 설정
@RequestMapping("/community/") // RESTful API 기본 경로 설정
public class PostController {
	
	@Autowired
	private PostService postService;
	
//	// 게시판 글쓰기
//	@GetMapping("/C_boardWrite")
//	public 
	
	// 방명록 저장
	@PostMapping("/C_board/C_boardWrite")
	public String post_wirte(@RequestBody PostVO p) {
		
		this.postService.insertPost(p);
		System.out.println(p);
		return "success";
	}
	
	// 게시판 목록
	@GetMapping("/C_board/")
	public PageVO guestbook_list(
		@RequestParam(value = "page", defaultValue = "1") int page,
		@RequestParam(value = "limit", defaultValue = "10") int limit) {

			long totalCount = postService.getTotalCount(); // 총 레코드 수
			int maxpage = (int) ((double) totalCount / limit + 0.95); // 총 페이지 수
			int startrow = (page - 1) * limit + 1; // 시작 행
			int endrow = startrow + limit - 1; // 끝 행

		    PageVO p = new PageVO();
		    p.setStartrow(startrow);
		    p.setEndrow(endrow);
		    p.setPage(page);
		    p.setMaxpage(maxpage);
		    p.setTotalCount(totalCount);
		    p.setGuestBookList(postService.getPostList(p));

	        return p;
	    }
}
