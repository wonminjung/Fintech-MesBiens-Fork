package mesbiens.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import mesbiens.member.vo.LoginRecordVo;
import mesbiens.member.vo.MemberVO;


public interface LoginRecordRepository extends JpaRepository<LoginRecordVo, Integer> {

	
	void deleteByMemberNo(MemberVO member);

}
