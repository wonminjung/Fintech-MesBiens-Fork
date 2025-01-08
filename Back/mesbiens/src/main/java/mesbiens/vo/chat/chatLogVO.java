package mesbiens.vo.chat;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

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

public class chatLogVO {
	
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
	private chatVO chatNo; // 익명채팅 No 
	
	private String chatLogContent; // 채팅내용
	
	@CreationTimestamp
	private Timestamp chatLogSendTime; // 채팅 전송 시각
	
	@CreationTimestamp
	private Timestamp chatLogCreateTime; // 로그 생성 시각
	
	private String chatLogDescription; // 로그 설명
	
}
