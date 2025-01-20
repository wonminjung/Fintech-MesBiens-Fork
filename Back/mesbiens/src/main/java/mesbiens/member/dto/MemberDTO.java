package mesbiens.member.dto;

import lombok.Data;

@Data
public class MemberDTO {
    private String memberName;     // 회원 이름
    private String memberEmail;    // 이메일
    private String memberId;       // 로그인 ID
    private String memberPassword; // 비밀번호
    private String memberPhone;    // 전화번호
    private String memberAddress;  // 주소
    private String memberBirth;    // 생년월일
}