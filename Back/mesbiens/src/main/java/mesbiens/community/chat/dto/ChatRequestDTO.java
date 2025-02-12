package mesbiens.community.chat.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import mesbiens.community.chat.vo.ChatVO;
import mesbiens.member.vo.MemberVO;

@Setter
@Getter
@ToString

public class ChatRequestDTO {

	private int chatNo;
	private int memberNo; // 회원 ID
	private String chatSessionId; // 사용자 익명 아이디
	private String chatContent; // 익명채팅 내용
	private Timestamp chatTime; // 익명채팅 전송 시간
	
	public ChatRequestDTO() {};
	
	public MemberVO toMemberVO() {
    	MemberVO member = new MemberVO();
    	member.setMemberNo(this.memberNo);
    	return member;
    }
	
	// VO → DTO
	public static ChatRequestDTO fromChatVO(ChatVO chatVO) {
        ChatRequestDTO dto = new ChatRequestDTO();
        dto.setChatNo(chatVO.getChatNo());
        dto.setMemberNo(chatVO.getMemberNo().getMemberNo());
        dto.setChatSessionId(chatVO.getChatSessionId());
        dto.setChatContent(chatVO.getChatContent());
        dto.setChatTime(chatVO.getChatTime());
        return dto;
    }
	
	public ChatVO toChatVO(MemberVO member, String chatSessionId) {
        ChatVO chatVO = new ChatVO();
        chatVO.setMemberNo(member);
        chatVO.setChatSessionId(chatSessionId);
        chatVO.setChatContent(this.chatContent);
        chatVO.setChatTime(new Timestamp(System.currentTimeMillis()));
        return chatVO;
    }
}
