package mesbiens.member.vo;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "NOTIFICATION_NO")
	    private int notificationNo; //알림 ID

	    @ManyToOne  //ManyToOne 관계로 여러 개의 알림이 하나의 회원과 연결
	    @JoinColumn(name = "member_no", referencedColumnName = "member_no", nullable = false)
	    private MemberVO memberVo; //FK

	    @ManyToOne
	    @JoinColumn(name = "notificationTypeNo", referencedColumnName = "notificationType_No", nullable = false)
	    private NotificationType notificationType; //알림 유형
	    
	    @Column(name = "NTFC_title", nullable = false, length = 100)
	    private String notificationTitle; //알림 제목
	   
	    @Column(name = "NTFC_message", nullable = false, length = 255)
	    private String notificationMessage = ""; // 알림메세지  , 기본값 설정

	    @Column(name = "NTFC_read_status", nullable = false, length = 1)
	    private String notificationReadStatus = "N"; //알림 읽음 상태

	    @Temporal(TemporalType.TIMESTAMP)
	    @Column(name = "NTFC_create_date", nullable = false)
	    private Date notificationCreateDate = new Date(); //알림생성 날짜
}


