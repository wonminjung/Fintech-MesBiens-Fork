package mesbiens.community.chat.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import mesbiens.community.chat.vo.ChatVO;
import mesbiens.member.repository.MemberRepository;

@Repository
public class ChatDAOImpl implements ChatDAO {

	@Autowired
	private ChatRepository chatRepository;

	@PersistenceContext
	private EntityManager entityManager;
	// JPA 사용 → entityManager.persist(post);로 데이터 저장.

	@Autowired
	private MemberRepository memberRepository;
	
	@Override
	public void insertChat(ChatVO chatVO) {
		chatRepository.save(chatVO);
	}

	// 모든 채팅 조회 (최신순)
	@Override
	public List<ChatVO> selectAllChats() {
		return chatRepository.findAllByOrderByChatTimeDesc();
	}

}
