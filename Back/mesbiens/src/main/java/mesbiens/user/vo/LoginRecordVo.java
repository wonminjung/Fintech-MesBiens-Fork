package mesbiens.user.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_login_records")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class LoginRecordVo {
	@Id
    @Column(name = "id") // 로그인 기록 ID (Primary Key)
    private Long id;

    @ManyToOne // 회원 ID (외래 키)
    @JoinColumn(name = "user_id", nullable = false) // 외래 키 컬럼 설정
    private UserVo member; // MemberVo 엔티티와 연관됨 (회원 테이블과 연결)

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "user_login_time", nullable = false) // 로그인 시각 (필수)
    private java.util.Date userLoginTime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "user_logout_time") // 로그아웃 시각 (옵션)
    private java.util.Date userLogoutTime;

    @Column(name = "user_login_request_ip", nullable = false, length = 45) // 로그인 요청 IP 주소 (필수)
    private String userLoginRequestIp;

    @Column(name = "user_login_status", length = 1) // 로그인 상태 (옵션)
    private String userLoginStatus;

    @Column(name = "user_failure_reason", length = 255) // 실패 사유 (옵션)
    private String userFailureReason;
}