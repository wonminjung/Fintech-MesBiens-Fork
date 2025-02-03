package mesbiens.member.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import mesbiens.member.repository.MemberRepository;
import mesbiens.member.vo.MemberVO;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    public CustomUserDetailsService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 로그 추가: 사용자 검색 시작
        logger.info("사용자 '{}' 정보 조회 시작", username);
        
        // 사용자를 데이터베이스에서 조회
        MemberVO member = memberRepository.findByMemberId(username)
                .orElseThrow(() -> {
                    // 로그 추가: 사용자 찾을 수 없음
                    logger.warn("사용자 '{}'을(를) 찾을 수 없습니다.", username);
                    return new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + username);
                });

        // 로그 추가: 사용자 정보 조회 성공
        logger.info("사용자 '{}' 정보 조회 성공", username);
        
        // 사용자의 역할 정보를 가져와서 설정
        // 예시로 "USER" 역할만 추가하고 있지만, 실제 애플리케이션에서는 더 다양한 역할이 있을 수 있습니다.
        String[] roles = member.getRoles() != null ? member.getRoles().split(",") : new String[]{"USER"};

        // UserDetails 객체 생성 후 반환
        return User.builder()
                .username(member.getMemberId())
                .password(member.getMemberPassword()) // 암호화된 비밀번호 사용
                .roles(roles) // 실제 사용자 역할을 기반으로 설정
                .build();
    }
}
