package mesbiens.member.repository;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import mesbiens.member.vo.MemberVO;

public interface MemberRepository extends CrudRepository<MemberVO, Integer> {

    // 회원 번호(memberNo)를 기준으로 조회하는 메소드
    Optional<MemberVO> findByMemberNo(int memberNo);
    
}