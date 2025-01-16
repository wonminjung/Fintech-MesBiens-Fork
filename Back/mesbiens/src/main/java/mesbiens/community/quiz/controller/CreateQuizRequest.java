package mesbiens.community.quiz.controller;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import mesbiens.community.quiz.vo.QuizVo;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreateQuizRequest {
    private int memberId;
    private QuizVo quizVo;

   
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime quizLastUpdate;  // 필요하다면 이 필드를 추가로 받을 수 있음

    // 기본 생성자
    public CreateQuizRequest() {}
}