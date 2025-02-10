package mesbiens.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mesbiens.member.vo.MemberVO;
import mesbiens.member.vo.VerificationCode;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Integer> {
    VerificationCode findByMemberVO(MemberVO member);
    VerificationCode findByMemberVOAndEmailCode(MemberVO member, String emailCode);
}