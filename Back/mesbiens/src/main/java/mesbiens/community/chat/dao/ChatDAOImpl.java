package mesbiens.community.chat.dao;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import mesbiens.community.chat.dto.ChatRequestDTO;
import mesbiens.community.chat.vo.ChatVO;
import mesbiens.member.repository.MemberRepository;
import mesbiens.member.vo.MemberVO;

@Repository
public class ChatDAOImpl implements ChatDAO {

	@Autowired
	private ChatRepository chatRepository;

	@PersistenceContext
	private EntityManager entityManager;
	// JPA 사용 → entityManager.persist(post);로 데이터 저장.

//	@Autowired
//	private MemberRepository memberRepository;
	
	@Override
	public void insertChat(ChatVO chatVO) {
		System.out.println("📥 DB 저장: " + chatVO);
		chatRepository.save(chatVO);
	}

	// Session 아이디 찾아오기
	@Override
	public String getOrGenerateChatSessionId(MemberVO member) {
		Optional<ChatVO> existingChat = chatRepository.findTopByMemberNo(member);
        
        return existingChat.map(ChatVO::getChatSessionId)
                           .orElseGet(() -> generateUniqueChatSessionId());	}
	
     // 4자리 중복 없는 랜덤 숫자 생성
    private String generateUniqueChatSessionId() {
        Random random = new Random();
        String randomId;
        int maxAttempts = 100; // 무한 루프 방지
        int attempts = 0;

        do {
            int randomNumber = 1000 + random.nextInt(9000); // 1000~9999
            randomId = String.valueOf(randomNumber);
            attempts++;
        } while (chatRepository.existsByChatSessionId(randomId) && attempts < maxAttempts);

        if (attempts >= maxAttempts) {
            throw new RuntimeException("Unique chatSessionId generation failed after 100 attempts.");
        }

        return randomId;
    }
	
	
	
	// 모든 채팅 조회 (최신순)
	@Override
	public List<ChatVO> getAllChats() {
		return chatRepository.findAllByOrderByChatTimeAsc();
	}

}
