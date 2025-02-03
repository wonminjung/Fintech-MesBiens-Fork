package mesbiens.security;

import java.util.List;

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
    
    
 // SecurityFilterChain을 사용한 보안 설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // CSRF 보호 비활성화
            .authorizeHttpRequests(authz -> authz
                .requestMatchers
                ("/members/register", "/members/login", "/members/{id}", "/quiz/create","/members/logout/*",
                		"/quiz/list","quiz/{quizId}","quiz//update/{quizId}","/quiz/delete/{quizId}",
                		"/community/C_board/C_boardWrite","/community/C_board/C_boardWrite_ok","/community/C_board","/community/{postNo}","community/{postNo}/view"
                		,"/community/{postNo}","/account/add","/account/modify","/account/delete"
                		,"/notifications/member/{memberNo}","/notifications/{notificationNo}/read"
                		,"/notifications").permitAll() // 경로 접근 허용
                .anyRequest().authenticated() // 나머지 요청은 인증 필요
            );
            
        return http.build();
    }
    
    
    
    
    
    
    
    /*

    // SecurityFilterChain을 사용한 보안 설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // CSRF 보호 비활성화
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/members/register").permitAll()// 회원가입 페이지 접근 허용
                .requestMatchers("/members/login").permitAll() // 로그인 경로 접근 허용
                .anyRequest().authenticated() // 나머지 요청은 인증 필요
            );
        return http.build();
    }
    */
    
}