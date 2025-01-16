package mesbiens.community.quiz.controller;

import mesbiens.community.quiz.service.QuizService;
import mesbiens.community.quiz.vo.QuizVo;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public Optional<QuizVo> getQuizById(@PathVariable("quizId") int quizId) {
        return quizService.getQuizById(quizId);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createQuiz(@RequestBody CreateQuizRequest request) {
    	// quiz 객체에 필요한 memberId와 quizVo를 전달하여 퀴즈 생성
        QuizVo quizVo = request.getQuizVo();
    	
    	// quiz 객체에 필요한 memberId와 quizVo를 전달하여 퀴즈 생성
        quizService.createQuiz(request.getMemberId(),quizVo);
        return ResponseEntity.ok("Quiz created successfully!");
    }

    // 퀴즈 수정
    @PutMapping("/update/{quizId}")
    public ResponseEntity<QuizVo> updateQuiz(@PathVariable("quizId") int quizId, @RequestBody QuizVo updatedQuizVo) {
        try {
            QuizVo updatedQuiz = quizService.updateQuiz(quizId, updatedQuizVo);
            return ResponseEntity.ok(updatedQuiz);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // 퀴즈 삭제
    @DeleteMapping("/delete/{quizId}")
    public ResponseEntity<String> deleteQuiz(@PathVariable("quizId") int quizId) {
        boolean deleted = quizService.deleteQuiz(quizId);
        if (deleted) {
            return ResponseEntity.ok("Quiz deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Quiz not found");
        }
    }
}