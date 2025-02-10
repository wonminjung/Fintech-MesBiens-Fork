package mesbiens.community.chat.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import mesbiens.community.chat.vo.ChatVO;

public interface ChatRepository extends JpaRepository<ChatVO, Integer> {

	List<ChatVO> findAllByOrderByChatTimeDesc();
	
}
