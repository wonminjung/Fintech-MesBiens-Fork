package mesbiens.shop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;
import mesbiens.member.vo.MemberVO;
import mesbiens.shop.vo.CartVO;
import mesbiens.shop.vo.ProductVO;

public interface CartRepository extends JpaRepository<CartVO, Integer> {

	List<CartVO> findByMember(MemberVO member);

	@Query("SELECT c FROM CartVO c WHERE c.member = :member AND c.product = :product")
	CartVO findByMemberAndProduct(@Param("member") MemberVO member, @Param("product") ProductVO product);

	@Modifying
    @Transactional
    @Query("DELETE FROM CartVO c WHERE c.cartNo = :cartNo")
    void deleteCartById(@Param("cartNo") int cartNo);

}
