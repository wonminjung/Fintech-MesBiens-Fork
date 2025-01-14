package mesbiens.community.quiz.controller;

import mesbiens.community.quiz.service.QuizService;
import mesbiens.community.quiz.vo.QuizVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    // 모든 퀴즈 목록 조회
    @GetMapping("/list")
    public List<QuizVo> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    // 특정 퀴즈 조회
    @GetMapping("/{quizId}")
    public Optional<QuizVo> getQuizById(@PathVariable Long quizId) {
        return quizService.getQuizById(quizId);
    }

    // 퀴즈 생성
    @PostMapping("/create")
    public QuizVo createQuiz(@RequestBody QuizVo quizVo) {
        return quizService.createQuiz(quizVo);
    }

    // 퀴즈 수정
    @PutMapping("/update/{quizId}")
    public QuizVo updateQuiz(@PathVariable Long quizId, @RequestBody QuizVo updatedQuizVo) {
        return quizService.updateQuiz(quizId, updatedQuizVo);
    }

    // 퀴즈 삭제
    @DeleteMapping("/delete/{quizId}")
    public boolean deleteQuiz(@PathVariable Long quizId) {
        return quizService.deleteQuiz(quizId);
    }
}