package mesbiens.community.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import mesbiens.community.chat.service.ChatService;

@RestController("/community/C_board/*")
public class ChatController {
	
	@Autowired
	private ChatService chatService;
	
	// 
	
	
}
