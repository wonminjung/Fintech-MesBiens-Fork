package mesbiens.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import mesbiens.member.vo.MemberVO;
import mesbiens.shop.vo.CartVO;
import mesbiens.shop.vo.ShopVO;

public interface ShopRepository extends JpaRepository<ShopVO, Integer> {

	List<CartVO> findByMember(MemberVO member);

}
