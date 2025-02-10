package mesbiens.community.chat.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mesbiens.community.chat.service.ChatService;
import mesbiens.community.chat.vo.ChatVO;

@RestController
@RequestMapping("/community/chat")
//@CrossOrigin(origins = "http://localhost:4000") // React 개발 서버 허용(하나의 URL에서 두개의 페이지를 불러올경우 CORS 방지)
public class ChatController {
	
	@Autowired
	private ChatService chatService;
	
	
	// 채팅 작성
	@PostMapping("/chat_Write_ok")
	public ResponseEntity<String> postchatWrite(@RequestBody ChatVO chatVO) {
		
		chatService.getWriteChat(chatVO);
		
		return ResponseEntity.ok("채팅 메시지 저장 성공");
	}
	
	// 채팅 조회
	@GetMapping("/messages")
	public ResponseEntity<List<ChatVO>> getAllChats() {
		return ResponseEntity.ok(chatService.getAllChats());
	}
	
}
