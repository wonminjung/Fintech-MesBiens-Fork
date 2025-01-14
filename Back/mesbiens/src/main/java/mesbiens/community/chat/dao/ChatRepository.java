package mesbiens.community.chat.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import mesbiens.community.chat.vo.ChatVO;

public interface ChatRepository extends JpaRepository<ChatVO, Integer> {

}
