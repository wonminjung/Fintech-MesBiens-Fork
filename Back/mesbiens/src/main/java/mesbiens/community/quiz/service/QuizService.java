package mesbiens.community.quiz.service;
import mesbiens.community.quiz.repository.QuizRepository;
import mesbiens.community.quiz.vo.QuizVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    // 퀴즈 생성
    public QuizVo createQuiz(QuizVo quizVo) {
        return quizRepository.save(quizVo);
    }

    // 퀴즈 조회
    public List<QuizVo> getAllQuizzes() {
        return quizRepository.findAll();
    }

    // 특정 사용자 퀴즈 조회
    public List<QuizVo> getQuizzesByUserId(Long userId) {
        return quizRepository.findByMember_UserId(userId);
    }

    // 특정 퀴즈 조회
    public Optional<QuizVo> getQuizById(Long quizId) {
        return quizRepository.findById(quizId);
    }

    // 퀴즈 수정
    public QuizVo updateQuiz(Long quizId, QuizVo updatedQuizVo) {
        Optional<QuizVo> existingQuizOpt = quizRepository.findById(quizId);
        if (existingQuizOpt.isPresent()) {
            QuizVo existingQuiz = existingQuizOpt.get();
            existingQuiz.setQuizQuestion(updatedQuizVo.getQuizQuestion());
            existingQuiz.setQuizCorrectAnswer(updatedQuizVo.getQuizCorrectAnswer());
            existingQuiz.setQuizHint(updatedQuizVo.getQuizHint());
            existingQuiz.setQuizDifficulty(updatedQuizVo.getQuizDifficulty());
            existingQuiz.setQuizTotalScore(updatedQuizVo.getQuizTotalScore());
            existingQuiz.setQuizCorrectCount(updatedQuizVo.getQuizCorrectCount());
            existingQuiz.setQuizRank(updatedQuizVo.getQuizRank());
            existingQuiz.setQuizLastUpdate(updatedQuizVo.getQuizLastUpdate());
            return quizRepository.save(existingQuiz);
        } else {
            return null;
        }
    }

    // 퀴즈 삭제
    public boolean deleteQuiz(Long quizId) {
        if (quizRepository.existsById(quizId)) {
            quizRepository.deleteById(quizId);
            return true;
        } else {
            return false;
        }
    }
}