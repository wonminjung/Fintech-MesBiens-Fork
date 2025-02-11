package mesbiens.security;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import mesbiens.member.service.CustomUserDetailsService;



@Configuration
@RequiredArgsConstructor

public class SecurityConfig {

  private final JwtTokenProvider jwtTokenProvider;
  private final CustomUserDetailsService customUserDetailsService;
  private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

  
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(); // 비밀번호 인코더 설정
  }

  // SecurityFilterChain을 사용한 보안 설정
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http
	        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
	        .csrf(csrf -> csrf.disable())
	        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // JWT 사용 시 Stateless 유지
	        .authorizeHttpRequests(auth -> auth
	            .requestMatchers(
	            		
	                "/members/register", "/members/login", "/members/{id}", "/quiz/create", "/members/me",
	                "/members/logout/*", "/members/token/refresh", "/members/find-id/**", "/members/find-password",
	                "/members/reset-password", "/community/**", "/account/**", "/allBankList", "/transaction/**",
	                "/notifications/member/{memberNo}", "/notifications/{notificationNo}/read", "/notifications",
	                "/", "/login", "/oauth2/**","/members/validate-password","/members/*" //  OAuth2 관련 경로 추가 (비로그인 허용)
	            ).permitAll()
	            .anyRequest().authenticated()
	        )
	        .oauth2Login(oauth2 -> oauth2
	            .defaultSuccessUrl("/loginSuccess", true)
	            .userInfoEndpoint(userInfo -> userInfo.userService(new DefaultOAuth2UserService())) 
	            .successHandler(oAuth2LoginSuccessHandler)
	        )
	        .formLogin(login -> login
	            .loginProcessingUrl("/login")
	            .successHandler((request, response, authentication) -> {
	                response.setContentType("application/json");
	                response.setCharacterEncoding("UTF-8");
	                response.getWriter().write("{\"message\": \"로그인 성공\"}");
	            })
	            .failureHandler((request, response, exception) -> {
	                response.setContentType("application/json");
	                response.setCharacterEncoding("UTF-8");
	                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	                response.getWriter().write("{\"error\": \"로그인 실패\"}");
	            })
	        )
	        .logout(LogoutConfigurer::permitAll);

	    return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    CorsConfiguration configuration = new CorsConfiguration();
	    
	    configuration.setAllowedOrigins(List.of("http://localhost:4000")); 
	    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // OPTIONS 추가
	    configuration.setAllowedHeaders(List.of("Authorization", "Content-Type")); 
	    configuration.setAllowCredentials(true);
	    
	    source.registerCorsConfiguration("/**", configuration);
	    
	    return source;
	}
}