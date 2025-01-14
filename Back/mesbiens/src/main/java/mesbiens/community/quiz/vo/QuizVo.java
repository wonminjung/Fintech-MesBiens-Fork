package mesbiens.community.quiz.vo;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;
import mesbiens.member.vo.MemberVO;

@Entity
@Table(name = "quiz")
@Setter
@Getter
public class QuizVo {
	
	@Id
	@Column(name = "quiz_no")
    private Long quizNo;  // 퀴즈 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no", referencedColumnName = "member_no", nullable = false)
    private MemberVO member;  // MemberVo와의 관계 (사용자 ID)

    @Column(name = "quiz_question", nullable = false, length = 500)
    private String quizQuestion;  // 퀴즈 질문

    @Column(name = "quiz_correct_answer", nullable = false, length = 1)
    private String quizCorrectAnswer;  // 퀴즈 정답

    @Column(name = "quiz_hint", length = 300)
    private String quizHint;  // 퀴즈 힌트 (nullable)

    @Column(name = "quiz_difficulty", nullable = false, length = 1)
    private String quizDifficulty;  // 퀴즈 난이도

    @Column(name = "quiz_create_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date quizCreateAt;  // 퀴즈 생성일

    @Column(name = "quiz_total_score", nullable = false)
    private int quizTotalScore;  // 퀴즈 총 점수

    @Column(name = "quiz_correct_count", nullable = false)
    private int quizCorrectCount;  // 퀴즈 맞춘 개수

    @Column(name = "quiz_rank", length = 50)
    private String quizRank;  // 퀴즈 랭크 (nullable)

    @Column(name = "quiz_last_update", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date quizLastUpdate;  // 퀴즈 마지막 업데이트 날짜

}
