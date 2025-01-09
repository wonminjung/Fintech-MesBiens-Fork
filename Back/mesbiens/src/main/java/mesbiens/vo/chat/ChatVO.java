package mesbiens.vo.chat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import mesbiens.vo.post.MemberVO;

@Setter
@Getter
@ToString
@Entity
@SequenceGenerator(
			name="chat_no_seq_chat",
			sequenceName = "chat_no_seq", // 시퀀스 이름
			initialValue = 1, // 시작값
			allocationSize = 1 // 증가값
		)
@Table(name="chat")
@EqualsAndHashCode(of="chatNo")

public class ChatVO {
	
	@Id
	@GeneratedValue(
			strategy = GenerationType.SEQUENCE, // 사용할 전략을 시퀀스로 선택
			generator = "chat_no_seq_chat" // 시퀀스 생성기에 설정해 놓은 제너레이터 이름
		)
	private Number chatNo;
	
	@ManyToOne // 다대일 관계 설정
	@JoinColumn(name = "memberId", nullable = false) // 외래키 매핑
	// name = "memberId": Post 테이블에서 외래키 컬럼 이름.
	// nullable = false: 이 컬럼이 반드시 값이 있어야 함을 지정.
	private MemberVO memberVO; // 회원 ID(글쓴이)
	
	@Column(nullable = false)
	private String chatSessionId; // 사용자 익명 아이디
	@Column(nullable = false)
	private String chatCotent; // 익명채팅 내용

	
	
}
