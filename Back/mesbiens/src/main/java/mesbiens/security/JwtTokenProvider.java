package mesbiens.security;

import io.jsonwebtoken.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final SecretKey key;
    private final long accessTokenValidity = 3600000; // 1시간 (60분)
    private final long refreshTokenValidity = 86400000; // 24시간 (1일)
    private final UserDetailsService userDetailsService;

    public JwtTokenProvider(@Value("${jwt.secretKey}") String secretKeyBase64, UserDetailsService userDetailsService) {
        byte[] decodedKey = Base64.getUrlDecoder().decode(secretKeyBase64);
        if (decodedKey.length != 32) {
            throw new IllegalArgumentException("The secret key must be 256 bits (32 bytes).");
        }
        this.key = new SecretKeySpec(decodedKey, 0, decodedKey.length, "HmacSHA256");
        this.userDetailsService = userDetailsService;
    }

    //  Access Token 생성
    public String createAccessToken(String memberId, String role) {
        return createToken(memberId, role, accessTokenValidity);
    }

    //  Refresh Token 생성 (서버에서 저장하여 관리)
    public String createRefreshToken(String memberId) {
        return createToken(memberId, "REFRESH", refreshTokenValidity);
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
        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) (accessTokenValidity / 1000)); // 초 단위
        cookie.setAttribute("SameSite", "Strict"); // CSRF 방지
        response.addCookie(cookie);
    }

    //  Refresh Token을 쿠키에 저장
    public void addRefreshTokenToCookie(HttpServletResponse response, String refreshToken) {
        Cookie cookie = new Cookie("refresh_token", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) (refreshTokenValidity / 1000)); // 초 단위
        cookie.setAttribute("SameSite", "Strict"); // CSRF 방지
        response.addCookie(cookie);
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

	public String createToken(String memberId, String string) {
		// TODO Auto-generated method stub
		return null;
	}
}
