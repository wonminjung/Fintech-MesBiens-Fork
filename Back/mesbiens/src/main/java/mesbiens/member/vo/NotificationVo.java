package mesbiens.member.vo;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.util.Date;

@Entity
@Table(name = "notification") // 테이블 이름 지정
@Getter
@Setter
public class NotificationVo {

	    @Id
	    @Column(name = "NOTIFICATION_NO") // 자동 증가를 제거하고 수동으로 관리
	    private Long notificationNo; // 알림 ID, 수동으로 설정해야 함

	    @ManyToOne
	    @JoinColumn(name = "member_no", referencedColumnName = "member_no", nullable = false)
	    private MemberVO memberVo; // 외래 키로 회원 ID 연결

	    @Column(name = "NTFC_title", nullable = false, length = 50)
	    private String notificationTitle; // 알림 제목

	    @Column(name = "NTFC_message", nullable = false, length = 255)
	    private String notificationMessage; // 알림 내용

	    @Column(name = "NTFC_type", nullable = false, length = 50)
	    private String notificationType; // 알림 유형

	    @Column(name = "NTFC_read_status", nullable = false, length = 1)
	    private String notificationReadStatus; // 읽음 여부 (CHAR(1))

	    @Column(name = "NTFC_create_date", nullable = false)
	    @Temporal(TemporalType.TIMESTAMP)
	    private Date notificationCreateDate; // 알림 생성 일자

}


