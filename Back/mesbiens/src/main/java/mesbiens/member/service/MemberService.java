package mesbiens.member.service;

import mesbiens.member.dto.MemberDTO;
import mesbiens.member.dto.MemberResponseDTO;
import mesbiens.member.repository.MemberRepository;
import mesbiens.member.vo.MemberVO;
import mesbiens.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // 사용자 등록
    public MemberResponseDTO registerMember(MemberDTO memberDTO) {
        // 이메일 또는 ID 중복 확인
        if (memberRepository.findByMemberEmail(memberDTO.getMemberEmail()).isPresent() ||
            memberRepository.findByMemberId(memberDTO.getMemberId()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 이메일 또는 ID입니다.");
        }

        // DTO -> 엔티티 변환
        MemberVO member = new MemberVO();
        member.setMemberName(memberDTO.getMemberName());
        member.setMemberEmail(memberDTO.getMemberEmail());
        member.setMemberId(memberDTO.getMemberId());
        member.setMemberPassword(passwordEncoder.encode(memberDTO.getMemberPassword()));
        member.setMemberPhone(memberDTO.getMemberPhone());
        member.setMemberAddress(memberDTO.getMemberAddress());
        member.setMemberBirth(memberDTO.getMemberBirth());
        member.setMemberSnsSignUpYN("N"); // 기본값

        MemberVO savedMember = memberRepository.save(member);

        // 엔티티 -> 응답 DTO 변환
        return toResponseDTO(savedMember);
    }

    // 로그인 처리
    public String login(String memberId, String password) {
        MemberVO member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자 ID입니다."));

        if (!passwordEncoder.matches(password, member.getMemberPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // JWT 토큰 생성
        return jwtTokenProvider.createToken(member.getMemberId(), "USER");
    }

    // 사용자 정보 조회
    public MemberResponseDTO findById(int memberNo) {
        MemberVO member = memberRepository.findByMemberNo(memberNo)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        return toResponseDTO(member);
    }

    // DTO 변환 메소드
    private MemberResponseDTO toResponseDTO(MemberVO member) {
        MemberResponseDTO responseDTO = new MemberResponseDTO();
        responseDTO.setMemberNo(member.getMemberNo());
        responseDTO.setMemberName(member.getMemberName());
        responseDTO.setMemberEmail(member.getMemberEmail());
        responseDTO.setMemberId(member.getMemberId());
        responseDTO.setMemberPhone(member.getMemberPhone());
        responseDTO.setMemberAddress(member.getMemberAddress());
        responseDTO.setMemberBirth(member.getMemberBirth());
        responseDTO.setMemberProfile(member.getMemberProfile());
        responseDTO.setMemberSnsSignUpYN(member.getMemberSnsSignUpYN());
        return responseDTO;
    }
}