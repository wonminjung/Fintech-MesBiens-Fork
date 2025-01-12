package mesbiens.community.chat.vo;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
@SequenceGenerator(
			name="chatLog_no_seq_chatLog", // 시퀀스 제너레이터 이름
			sequenceName = "chatLog_no_seq", // 시퀀스 이름
			initialValue = 1, // 시작값
			allocationSize = 1 // 증가값
		)
@Table(name="chatLog")
@EqualsAndHashCode(of="chatLogNo")

public class ChatLogVO {
	
	@Id
	@GeneratedValue(
				strategy = GenerationType.SEQUENCE, // 사용할 전략을 시퀀스로 선택
				generator = "chatLog_no_seq_chatLog" // 시퀀스 생성기에 설정해 놓은 제너레이터 이름
			)
	private Number chatLogNo;
	
	@OneToOne // 일대일 관계 설정
	@JoinColumn(name = "chatNo", nullable = false) // 외래키 매핑
	// name = "chatNo": Chat 테이블에서 외래키 컬럼 이름.
	// nullable = false: 이 컬럼이 반드시 값이 있어야 함을 지정.
	private ChatVO chatNo; // 익명채팅 No 
	
	@Column(nullable = false)
	private String chatLogContent; // 채팅내용
	
	@CreationTimestamp
	@Column(nullable = false)
	private Timestamp chatLogSendTime; // 채팅 전송 시각
	
	@CreationTimestamp
	@Column(nullable = false)
	private Timestamp chatLogCreateTime; // 로그 생성 시각
	
	@Column(nullable = false)
	private String chatLogDescription; // 로그 설명
	
}
