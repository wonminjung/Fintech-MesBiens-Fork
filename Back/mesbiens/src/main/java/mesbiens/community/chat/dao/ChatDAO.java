package mesbiens.community.chat.dao;

import java.util.List;

import mesbiens.community.chat.vo.ChatVO;
import mesbiens.member.vo.MemberVO;

public interface ChatDAO {

	void insertChat(ChatVO chatVO);

	String getOrGenerateChatSessionId(MemberVO member);
	
	List<ChatVO> getAllChats();

}
