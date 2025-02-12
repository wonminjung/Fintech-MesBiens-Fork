package mesbiens.community.chat.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mesbiens.community.chat.dto.ChatRequestDTO;
import mesbiens.community.chat.service.ChatService;

@RestController
@RequestMapping("/community/chat")
@CrossOrigin(origins = "http://localhost:4000") // React 개발 서버 허용(하나의 URL에서 두개의 페이지를 불러올경우 CORS 방지)
public class ChatController {
	
	@Autowired
	private ChatService chatService;
	
	// 채팅 작성
	@PostMapping("/send")
	public ResponseEntity<String> sendChat(@RequestBody ChatRequestDTO chatRequestDTO) {
	    if (chatRequestDTO.getMemberNo() == 0) {
	        throw new IllegalArgumentException("❌ memberNo가 0이므로 저장할 수 없습니다!");
	    }
	    
	    chatService.saveChat(chatRequestDTO);
	    return ResponseEntity.ok("채팅 메시지가 전송되었습니다.");
	}

	// 채팅 조회
	@GetMapping("/messages")
    public ResponseEntity<Map<String, Object>> getChatMessagesAndMember() {

        List<ChatRequestDTO> chatMessages = chatService.getAllChats();

        Map<String, Object> response = new HashMap<>();
        response.put("chatMessages", chatMessages);

        return ResponseEntity.ok(response);
    }
	
}
