package mesbiens.community.chat.dao;

import java.util.List;

import mesbiens.community.chat.vo.ChatVO;

public interface ChatDAO {

	void insertChat(ChatVO chatVO);

	List<ChatVO> selectAllChats();

}
