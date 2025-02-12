package mesbiens.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import mesbiens.member.vo.MemberVO;
import mesbiens.shop.vo.CartVO;

public interface CartRepository extends JpaRepository<CartVO, Integer> {

	List<CartVO> findByMember(MemberVO member);

}
