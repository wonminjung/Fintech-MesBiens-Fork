package mesbiens.member.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import mesbiens.member.repository.MemberRepository;
import mesbiens.member.vo.MemberVO;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	  private final MemberRepository memberRepository;

	    public CustomUserDetailsService(MemberRepository memberRepository) {
	        this.memberRepository = memberRepository;
	    }

	    @Override
	    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	        MemberVO member = memberRepository.findByMemberId(username)
	                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + username));
	        return User.builder()
	                .username(member.getMemberId())
	                .password(member.getMemberPassword()) // Spring Security 설정 시 암호화된 비밀번호 사용
	                .roles("USER") // 역할 설정 (예: USER, ADMIN)
	                .build();
	    }
	}