package mesbiens.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = jwtTokenProvider.getTokenFromCookie(request); //  쿠키에서 Access Token 가져오기
        String refreshToken = jwtTokenProvider.getRefreshTokenFromCookie(request); //  쿠키에서 Refresh Token 가져오기

        if (token != null) {
            //  Access Token 검증
            if (jwtTokenProvider.validateToken(token)) {
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                
                //인증된 사용자 정보를 securitycontext에 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println(" JWT 인증 성공: " + authentication.getName());
            } else {
                System.out.println(" Access Token 만료됨");
                if (refreshToken != null && jwtTokenProvider.validateToken(refreshToken)) {
                    //  Refresh Token이 유효하면 새로운 Access Token 발급
                    String newAccessToken = jwtTokenProvider.createAccessToken(jwtTokenProvider.getMemberId(refreshToken), "USER_ROLE");
                    jwtTokenProvider.addJwtTokenToCookie(response, newAccessToken);
                    Authentication authentication = jwtTokenProvider.getAuthentication(newAccessToken);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    System.out.println(" 새로운 Access Token 발급됨: " + newAccessToken);
                } else {
                    System.out.println(" Refresh Token도 유효하지 않음. 인증 실패");
                }
            }
        }

        filterChain.doFilter(request, response); //  다음 필터로 진행
    }
}