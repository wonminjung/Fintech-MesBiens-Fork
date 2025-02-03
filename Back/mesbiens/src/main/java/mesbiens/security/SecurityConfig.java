package mesbiens.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import mesbiens.member.service.CustomUserDetailsService;

import java.util.Collections;

@Configuration
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailsService customUserDetailsService;

    // CustomUserDetailsService가 주입된 생성자
    public SecurityConfig(JwtTokenProvider jwtTokenProvider, CustomUserDetailsService customUserDetailsService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 비밀번호 인코더 설정
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // CSRF 비활성화 (JWT 사용 시 필요 없음)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 비활성화
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/members/register", "/members/login", "/members/token/refresh", "/members/me",
                		"/community/C_board/C_boardWrite","/community/C_board/C_boardWrite_ok","/community/C_board","/community/{postNo}","community/{postNo}/view"
                		,"/community/{postNo}","/account/add","/account/modify","/account/delete"
                		,"/notifications/member/{memberNo}","/notifications/{notificationNo}/read"
                		,"/notifications").permitAll() // 로그인, 회원가입, 토큰 재발급 허용
                .anyRequest().authenticated() // 나머지 요청은 인증 필요
            )
            .formLogin(form -> form.disable()) // 기본 로그인 비활성화
            .httpBasic(httpBasic -> httpBasic.disable()) // HTTP Basic 인증 비활성화
            .logout(logout -> logout
                .logoutUrl("/members/logout")
                .invalidateHttpSession(true)
                .deleteCookies("jwt", "refresh_token") // JWT, Refresh Token 삭제
                .logoutSuccessHandler((request, response, authentication) -> {
                    response.setStatus(200);
                    response.getWriter().write("로그아웃 성공");
                })
            )
            .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class) // JWT 필터 추가
            .authenticationManager(authenticationManager()); // 커스텀 인증 매니저 추가

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        // DaoAuthenticationProvider를 사용하여 사용자 인증 처리
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(customUserDetailsService); // UserDetailsService 설정
        provider.setPasswordEncoder(passwordEncoder()); // 비밀번호 인코더 설정

        return new ProviderManager(Collections.singletonList(provider)); // ProviderManager에 provider 추가
    }
}
