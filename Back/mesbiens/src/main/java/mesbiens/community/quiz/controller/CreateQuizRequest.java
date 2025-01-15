package mesbiens.community.quiz.controller;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import mesbiens.community.quiz.vo.QuizVo;

@Getter
@Setter
public class CreateQuizRequest {
	
	private Long memberId;
    private QuizVo quizVo;
    private String quizQuestion;
    private String quizCorrectAnswer;
    private String quizHint;
    private String quizDifficulty;
    private int quizTotalScore;
    private int quizCorrectCount;
    private String quizRank;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime quizLastUpdate;

    // 기본 생성자
    public CreateQuizRequest() {}
    
    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public QuizVo getQuizVo() {
        return quizVo;
    }

    public void setQuizVo(QuizVo quizVo) {
        this.quizVo = quizVo;
    }

}
