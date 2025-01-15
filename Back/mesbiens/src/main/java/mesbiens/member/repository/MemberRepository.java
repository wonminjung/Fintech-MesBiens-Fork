package mesbiens.member.repository;


import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import mesbiens.member.vo.MemberVO;

public interface MemberRepository extends CrudRepository<MemberVO, Long> {
    // findById 메서드는 Long 타입의 ID를 받음
    Optional<MemberVO> findById(Long memberId);
}
