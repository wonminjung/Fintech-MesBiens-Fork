package mesbiens.community.chat.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mesbiens.community.chat.dao.ChatDAO;
import mesbiens.community.chat.dto.ChatRequestDTO;
import mesbiens.community.chat.vo.ChatVO;
import mesbiens.member.vo.MemberVO;

@Service
public class ChatServiceImpl implements ChatService {

	
	@Autowired
    private ChatDAO chatDAO;

	// 챗팅 저장
	@Transactional
	@Override
	public void saveChat(ChatRequestDTO chatRequestDTO) {
	    if (chatRequestDTO.getMemberNo() == 0) {
	        throw new IllegalArgumentException("❌ memberNo가 0이므로 저장할 수 없습니다!");
	    }

	    MemberVO member = chatRequestDTO.toMemberVO();
	    String chatSessionId = chatDAO.getOrGenerateChatSessionId(member);

	    ChatVO chatVO = chatRequestDTO.toChatVO(member, chatSessionId);
	    chatDAO.insertChat(chatVO);
	}


	@Transactional
    @Override
    public List<ChatRequestDTO> getAllChats() {
        List<ChatVO> chatVOList = chatDAO.getAllChats();
        
        // VO → DTO 변환
        return chatVOList.stream()
                         .map(ChatRequestDTO::fromChatVO)
                         .collect(Collectors.toList());
    }


}
