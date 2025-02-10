package mesbiens.community.chat.service;

import java.util.List;

import mesbiens.community.chat.vo.ChatVO;

public interface ChatService {

	void getWriteChat(ChatVO chatVO);

	List<ChatVO> getAllChats();



}
