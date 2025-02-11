package mesbiens.community.chat.controller;


import java.util.Collections;
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

import jakarta.servlet.http.HttpServletRequest;
import mesbiens.community.chat.dto.ChatRequestDTO;
import mesbiens.community.chat.service.ChatService;
import mesbiens.community.chat.vo.ChatVO;

@RestController
@RequestMapping("/community/chat")
@CrossOrigin(origins = "http://localhost:4000") // React 개발 서버 허용(하나의 URL에서 두개의 페이지를 불러올경우 CORS 방지)
public class ChatController {
	
	@Autowired
	private ChatService chatService;
	
	
	// 채팅 작성
	@PostMapping("/send")
	public ResponseEntity<String> sendChat(@RequestBody ChatRequestDTO chatRequestDTO) {
	    System.out.println("📩 채팅 메시지 수신: " + chatRequestDTO.getChatContent());
	    System.out.println("👤 memberNo: " + chatRequestDTO.getMemberNo());
	    System.out.println("🔑 chatSessionId: " + chatRequestDTO.getChatSessionId());
	    
	    if (chatRequestDTO.getMemberNo() == 0) {
	        throw new IllegalArgumentException("❌ memberNo가 0이므로 저장할 수 없습니다!");
	    }
	    
	    chatService.saveChat(chatRequestDTO);
	    return ResponseEntity.ok("채팅 메시지가 전송되었습니다.");
	}

	
	@GetMapping("/messages")
    public ResponseEntity<Map<String, Object>> getChatMessagesAndMember(HttpServletRequest request) {
        int memberNo = getLoggedInMemberNo(request); // 로그인된 사용자 ID 가져오기
        if (memberNo == 0) {
            return ResponseEntity.status(401).body(Collections.singletonMap("error", "로그인이 필요합니다."));
        }

        List<ChatRequestDTO> chatMessages = chatService.getAllChats();

        Map<String, Object> response = new HashMap<>();
        response.put("memberNo", memberNo);
        response.put("chatMessages", chatMessages);

        return ResponseEntity.ok(response);
    }
	
    private int getLoggedInMemberNo(HttpServletRequest request) {
        // TODO: 현재 로그인된 사용자의 memberNo를 가져오는 로직 추가
        return 1; // 임시로 1로 설정
    }

	
}
