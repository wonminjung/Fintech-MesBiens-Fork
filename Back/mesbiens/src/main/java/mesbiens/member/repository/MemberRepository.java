package mesbiens.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import mesbiens.member.vo.MemberVO;

public interface MemberRepository extends JpaRepository<MemberVO, Integer> {

    // 회원 번호(memberNo)를 기준으로 조회하는 메소드
    Optional<MemberVO> findByMemberNo(int memberNo);
    
    // 이메일을 기준으로 조회하는 메소드
    Optional<MemberVO> findByMemberEmail(String memberEmail);
    

    // ID를 기준으로 조회하는 메소드
    Optional<MemberVO> findByMemberId(String memberId);
    
}