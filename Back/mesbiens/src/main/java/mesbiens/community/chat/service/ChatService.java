package mesbiens.community.chat.service;

import java.util.List;

import mesbiens.community.chat.dto.ChatRequestDTO;
import mesbiens.community.chat.vo.ChatVO;

public interface ChatService {

	void saveChat(ChatRequestDTO chatRequestDTO);

	List<ChatRequestDTO> getAllChats();

}
