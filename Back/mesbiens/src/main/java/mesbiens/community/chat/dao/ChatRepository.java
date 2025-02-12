package mesbiens.community.chat.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import mesbiens.community.chat.vo.ChatVO;
import mesbiens.member.vo.MemberVO;

public interface ChatRepository extends JpaRepository<ChatVO, Integer> {


	// 특정 chatSessionId가 이미 존재하는지 확인 (중복 체크)
	boolean existsByChatSessionId(String randomId);
	
	// 특정 멤버의 최근 채팅 정보 조회 (chatSessionId 가져오기 위함)
	Optional<ChatVO> findTopByMemberNo(MemberVO member);

	// 채팅 목록 조회 ASC(오름차순)으로 정렬
	List<ChatVO> findAllByOrderByChatTimeAsc();

}
