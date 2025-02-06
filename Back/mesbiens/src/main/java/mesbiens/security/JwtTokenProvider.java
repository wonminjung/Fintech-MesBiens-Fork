package mesbiens.security;

import java.util.Base64;
import java.util.Date;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtTokenProvider {
   private static final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class);
    private final SecretKey key;
    private final long accessTokenValidity = 3600000; // 1시간 (60분)
    private final long refreshTokenValidity = 86400000; // 24시간 (1일)
    private final UserDetailsService userDetailsService;

    public JwtTokenProvider(@Value("${jwt.secretKey}") String secretKeyBase64, UserDetailsService userDetailsService) {
       System.out.println("Secret Key (Base64): " + secretKeyBase64); // Base64 인코딩된 키 값 출력
       byte[] decodedKey = Base64.getUrlDecoder().decode(secretKeyBase64);
       System.out.println("Secret Key (Decoded Length): " + decodedKey.length); // 디코딩된 키 길이 출력
        if (decodedKey.length != 32) {
            throw new IllegalArgumentException("The secret key must be 256 bits (32 bytes).");
        }
        this.key = new SecretKeySpec(decodedKey, 0, decodedKey.length, "HmacSHA256");
        this.userDetailsService = userDetailsService;
    }

    // Access Token 생성
    public String createAccessToken(String memberId, String role) {
        log.debug("createAccessToken() 메서드 시작: memberId={}, role={}", memberId, role);
        try {
            String token = createToken(memberId, role, accessTokenValidity);
            log.debug("createAccessToken() 메서드 종료 (성공): token={}", token); // 토큰 값은 보안에 유의하여 로그에 남기지 않도록 주의
            return token;
        } catch (Exception e) {
            log.error("createAccessToken() 메서드 오류: {}", e.getMessage(), e);
            return null;
        }
    }

    // Refresh Token 생성 (서버에서 저장하여 관리)
    public String createRefreshToken(String memberId) {
        log.debug("createRefreshToken() 메서드 시작: memberId={}", memberId);
        try {
            String token = createToken(memberId, "REFRESH", refreshTokenValidity);
            log.debug("createRefreshToken() 메서드 종료 (성공): token={}", token); // 토큰 값은 보안에 유의하여 로그에 남기지 않도록 주의
            return token;
        } catch (Exception e) {
            log.error("createRefreshToken() 메서드 오류: {}", e.getMessage(), e);
            return null;
        }
    }
    //  공통적인 토큰 생성 로직
    public String createToken(String memberId, String role, long validity) {
        Claims claims = Jwts.claims().setSubject(memberId);
        claims.put("role", role);

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + validity);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
     
    

    //  JWT 토큰을 쿠키에 저장 (Access Token)
    public void addJwtTokenToCookie(HttpServletResponse response, String token) {
        String cookieValue = "jwt=" + token +
                             "; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=" + (accessTokenValidity / 1000);

        response.addHeader("Set-Cookie", cookieValue); // 기존 setHeader → addHeader 로 수정
    }

    //  Refresh Token을 쿠키에 저장
    public void addRefreshTokenToCookie(HttpServletResponse response, String refreshToken) {
        String cookieValue = "refresh_token=" + refreshToken +
                             "; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=" + (refreshTokenValidity / 1000);

        response.addHeader("Set-Cookie", cookieValue); // 기존 setHeader → addHeader로 변경
        System.out.println("JWT 쿠키 추가됨: " + cookieValue); // 로그 추가
    }

    //  JWT 쿠키 삭제 (로그아웃 시)
    public void removeJwtTokenFromCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    //  Refresh Token 쿠키 삭제
    public void removeRefreshTokenFromCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("refresh_token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    //  토큰에서 사용자 ID 추출
    public String getMemberId(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (JwtException e) {
            return null;
        }
    }

    //  토큰 유효성 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
            return true; //  유효하면 true 반환
        } catch (JwtException | IllegalArgumentException e) {
            return false; //  유효하지 않으면 false 반환
        }
    }
    //HTTP 요청의 쿠키에서 jwt 이름의 쿠키를 찾아 jwt 토큰값 추출
    public String extractTokenFromRequest(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    // 쿠키에서 JWT 토큰 추출
    public String getTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    //  쿠키에서 Refresh Token 추출
    public String getRefreshTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh_token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    //  JWT를 이용한 Authentication 객체 생성
    public Authentication getAuthentication(String token) {
        String memberId = getMemberId(token);
        if (memberId == null) {
            return null;
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(memberId);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
/*
   public String createToken(String memberId, String role) {
       // 유효 기간을 1시간으로 고정
       long validity = 3600000;  // 1시간

       return createToken(memberId, role, validity);  // 첫 번째 메소드 호출
   }
*/
   
   }
