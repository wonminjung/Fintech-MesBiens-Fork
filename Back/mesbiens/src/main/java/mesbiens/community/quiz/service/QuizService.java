package mesbiens.community.quiz.service;
import mesbiens.community.quiz.repository.QuizRepository;
import mesbiens.community.quiz.vo.QuizVo;
import mesbiens.member.repository.MemberRepository;
import mesbiens.member.vo.MemberVO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {
	
	private static final Logger log = LoggerFactory.getLogger(QuizService.class);

    @Autowired
    private QuizRepository quizRepository;
    
    @Autowired
    private MemberRepository memberRepository;

    // 퀴즈 생성
    @Transactional
    public QuizVo createQuiz(int memberId,QuizVo quizVo) {
    	
    	// memberId로 Member 객체를 조회
        MemberVO member = memberRepository.findById(memberId)
        .orElseThrow(() -> new RuntimeException("Member not found"));

    	
    	 // 새로운 QuizVo 객체 생성
        QuizVo quiz = new QuizVo();
        
        // 수동으로 ID 값을 설정
       quiz.setQuizNo(123);; // 예시: ID를 123L로 설정

        // quizVo에서 나머지 값들을 설정
        quiz.setQuizQuestion(quizVo.getQuizQuestion());
        quiz.setQuizCorrectAnswer(quizVo.getQuizCorrectAnswer());
        quiz.setQuizHint(quizVo.getQuizHint());
        quiz.setQuizDifficulty(quizVo.getQuizDifficulty());
        quiz.setQuizTotalScore(quizVo.getQuizTotalScore());
        quiz.setQuizCorrectCount(quizVo.getQuizCorrectCount());
        quiz.setQuizRank(quizVo.getQuizRank());
        quiz.setQuizLastUpdate(quizVo.getQuizLastUpdate());
        
        

        // quiz 객체에 member 설정
        quiz.setMember(member);
        
        QuizVo savedQuiz = quizRepository.save(quiz);
        log.info("Quiz created successfully with ID: " + savedQuiz.getQuizNo());


        // 퀴즈 저장
        return savedQuiz;
    }

    // 퀴즈 조회
    public List<QuizVo> getAllQuizzes() {
        return quizRepository.findAll();
    }

    // 특정 사용자 퀴즈 조회
    public List<QuizVo> getQuizzesByUserId(int memberNo) {
        return quizRepository.findByMember_memberNo(memberNo);
    }

    // 특정 퀴즈 조회
    public Optional<QuizVo> getQuizById(int quizId) {
        return quizRepository.findById(quizId);
    }

    // 퀴즈 수정
    public QuizVo updateQuiz(int quizId, QuizVo updatedQuizVo) {
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
    public boolean deleteQuiz(int quizId) {
        if (quizRepository.existsById(quizId)) {
            quizRepository.deleteById(quizId);
            return true;
        } else {
            return false;
        }
    }


}