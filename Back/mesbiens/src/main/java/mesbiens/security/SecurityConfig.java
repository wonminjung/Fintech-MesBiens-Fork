package mesbiens.security;

import java.util.List;

import mesbiens.member.service.CustomUserDetailsService;

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
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS 설정 활성화
                .csrf(csrf -> csrf.disable()) // REST API는 대부분 stateless(JWT 등)을 사용하기 때문에 csrf 비활성화
                .authorizeHttpRequests(auth -> auth.requestMatchers(
                "/members/register", "/members/login", "/members/{id}", "/quiz/create", "/members/me",
                "/members/logout/*", "members/token/refresh",
                "/quiz/list", "quiz/{quizId}", "quiz//update/{quizId}", "/quiz/delete/{quizId}",
                "/community/**", "/account/**", "/allBankList", "/transaction/**", "/upload/**",
                "members/find-id/**", "members/find-password", "members/reset-password",
                "/community/**", "/account/**", "/allBankList", "/transaction/**",
                "/notifications/member/{memberNo}",
                "/notifications/{notificationNo}/read", "/notifications").permitAll() // 서버 URL에 요청할 경우 인증 없이 접근 가능
                .anyRequest().authenticated() // 나머지 요청은 인증 필요
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

        // .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // Stateless 설정
        return http.build();

    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("http://localhost:4000")); // 허용할 Origin
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE")); // 허용할 HTTP 메소드
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type")); // 허용할 헤더
        configuration.setAllowCredentials(true); // 쿠키 허용 여부

        source.registerCorsConfiguration("/**", configuration); // 모든 경로에 적용

        return source;
    }

}
