package mesbiens.user.vo;

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
@Table(name = "NOTIFICATION") // 테이블 이름 지정
@Getter
@Setter
public class NotificationVo {

	    @Id
	    @Column(name = "NOTIFICATION_ID") // 자동 증가를 제거하고 수동으로 관리
	    private Long notificationId; // 알림 ID, 수동으로 설정해야 함

	    @ManyToOne
	    @JoinColumn(name = "USER_ID", nullable = false)
	    private UserVo member; // 외래 키로 회원 ID 연결

	    @Column(name = "NOTIFICATION_TITLE", nullable = false, length = 50)
	    private String notificationTitle; // 알림 제목

	    @Column(name = "NOTIFICATION_MESSAGE", nullable = false, length = 255)
	    private String notificationMessage; // 알림 내용

	    @Column(name = "NOTIFICATION_TYPE", nullable = false, length = 50)
	    private String notificationType; // 알림 유형

	    @Column(name = "NOTIFICATION_READ_STATUS", nullable = false, length = 1)
	    private String notificationReadStatus; // 읽음 여부 (CHAR(1))

	    @Column(name = "NOTIFICATION_CREATEDATE", nullable = false)
	    @Temporal(TemporalType.TIMESTAMP)
	    private Date notificationCreateDate; // 알림 생성 일자

}


