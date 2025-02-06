package mesbiens.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
	private String memberId;
	private String userId;    // 프론트엔드에서 사용하는 필드 (추가)
    private String password;
    
 // memberId가 없으면 userId를 대신 사용
    public String getMemberId() {
        return memberId != null ? memberId : userId;
    }

    public String getPassword() {
        return password;


}

}