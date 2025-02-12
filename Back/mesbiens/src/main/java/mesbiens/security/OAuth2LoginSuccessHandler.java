package mesbiens.security;

import java.sql.Timestamp;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import mesbiens.member.repository.MemberRepository;
import mesbiens.member.repository.SnsInfoRepository;
import mesbiens.member.vo.MemberVO;
import mesbiens.member.vo.SnsInfoVO;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final SnsInfoRepository snsInfoRepository;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws ServletException, java.io.IOException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        String registrationId = oauthToken.getAuthorizedClientRegistrationId(); // 🔹 올바른 방식으로 값 가져오기
        
        System.out.println("OAuth2 Provider (registrationId): " + registrationId);

        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oauth2User.getAttributes();

        // 사용자 정보 저장 변수
        String snsId = null;
        String name = null;
        String email = null;
        String picture = null;
        String snsType = null;

        if (registrationId.equalsIgnoreCase("naver")) {
            // 네이버 응답 구조는 "response" 키 안에 정보가 포함됨
            Object responseObj = attributes.get("response");

            if (responseObj instanceof Map) {
                @SuppressWarnings("unchecked")
                Map<String, Object> naverResponse = (Map<String, Object>) responseObj;
                snsId = String.valueOf(naverResponse.get("id"));
                name = String.valueOf(naverResponse.get("name"));
                email = String.valueOf(naverResponse.get("email"));
                picture = String.valueOf(naverResponse.get("profile_image"));
                snsType = "NAVER";
            } 
        } else if (registrationId.equalsIgnoreCase("google")) {
            // 구글 응답 구조는 기본적으로 attributes에 정보 포함됨
            snsId = String.valueOf(attributes.get("sub"));
            name = String.valueOf(attributes.get("name"));
            email = String.valueOf(attributes.get("email"));
            picture = String.valueOf(attributes.get("picture"));
            snsType = "GOOGLE";
        } else if (registrationId.equalsIgnoreCase("kakao")) {
        	// 카카오 응답 처리
        	Object kakaoAccountObj = attributes.get("kakao_account");
        	if (kakaoAccountObj instanceof Map<?, ?>) { // 제네릭 타입 명시적으로 확인
        	    @SuppressWarnings("unchecked") // 불필요한 경고 방지
        	    Map<String, Object> kakaoAccount = (Map<String, Object>) kakaoAccountObj;
        	    snsId = String.valueOf(attributes.get("id"));
        	    email = kakaoAccount.get("email") != null ? kakaoAccount.get("email").toString() : null;
        	    
        	    // 이메일이 없는 경우 대비
                email = kakaoAccount.get("email") != null ? String.valueOf(kakaoAccount.get("email")) : "no-email";

        	    // 프로필 정보 가져오기
        	    Object profileObj = kakaoAccount.get("profile");
        	    if (profileObj instanceof Map<?, ?>) {
        	        @SuppressWarnings("unchecked")
        	        Map<String, Object> profile = (Map<String, Object>) profileObj;
        	        name = profile.get("nickname") != null ? profile.get("nickname").toString() : "KakaoUser";
        	        picture = profile.get("profile_image_url") != null ? profile.get("profile_image_url").toString() : null;
        	    }
        	    snsType = "KAKAO";
        	}
        } else {
            throw new IllegalArgumentException("지원하지 않는 OAuth2 제공자입니다: " + registrationId);
        }

        System.out.println("SNS ID: " + snsId);
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
        System.out.println("Picture: " + picture);
        System.out.println("SNS Type: " + snsType);

        // 기존 회원 여부 확인
        Optional<SnsInfoVO> existingSnsInfo = snsInfoRepository.findBySnsId(snsId);
        MemberVO member = getMemberByEmail(email);

        if (member == null) {
            //  회원가입 필요 시 프론트 회원가입 페이지로 리디렉트
            response.sendRedirect("http://localhost:4000/signup?email=" + email);
            return;
        }

        if (existingSnsInfo.isEmpty()) {
            SnsInfoVO snsInfo = new SnsInfoVO();
            snsInfo.setSnsId(snsId);
            snsInfo.setSnsType(snsType);
            snsInfo.setSnsName(name);
            snsInfo.setSnsProfile(picture);
            snsInfo.setSnsConnectDate(new Timestamp(System.currentTimeMillis()));
            snsInfo.setMemberNo(member);
            snsInfoRepository.save(snsInfo);
        }

        response.sendRedirect("http://localhost:4000");
    }

 // 자동 회원가입 처리 (회원이 없을 경우)
    private MemberVO getMemberByEmail(String email) {
        Optional<MemberVO> member = memberRepository.findByMemberEmail(email);
        return member.orElseGet(() -> {
            MemberVO newMember = new MemberVO();
            newMember.setMemberEmail(email);
            newMember.setMemberName("SNS_USER"); // 기본값 설정
            newMember.setMemberSnsSignUpYN("Y"); // SNS 회원 여부 표시
            newMember.setRoles("USER"); // 기본 역할 설정

            // SNS 회원가입 시 비밀번호 자동 설정
            newMember.setDefaultPasswordIfEmpty();

            return memberRepository.save(newMember);
        });
    }

}