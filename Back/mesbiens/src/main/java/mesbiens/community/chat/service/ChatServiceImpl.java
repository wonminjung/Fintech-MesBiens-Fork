package mesbiens.community.chat.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mesbiens.community.chat.dao.ChatDAO;
import mesbiens.community.chat.vo.ChatVO;

@Service
public class ChatServiceImpl implements ChatService {

	
	@Autowired
    private ChatDAO chatDAO;

	@Override
	public void getWriteChat(ChatVO chatVO) {
		
		
		
		chatDAO.insertChat(chatVO);
	}

	@Override
	public List<ChatVO> getAllChats() {
		return chatDAO.selectAllChats();
	}
	


}
