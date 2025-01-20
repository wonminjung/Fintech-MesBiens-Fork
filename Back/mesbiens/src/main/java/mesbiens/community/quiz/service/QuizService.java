package mesbiens.community.quiz.service;

import mesbiens.community.quiz.repository.QuizRepository;
import mesbiens.community.quiz.vo.QuizVo;
import mesbiens.member.repository.MemberRepository;
import mesbiens.member.vo.MemberVO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

   

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private MemberRepository memberRepository;
    
 // 로그 추가
    private static final Logger logger = LoggerFactory.getLogger(QuizService.class);

    // 퀴즈 생성
    @Transactional
    public QuizVo createQuiz(int memberId, QuizVo quizVo) {
    	 // 로그 추가: memberId로 회원 조회 시도를 기록
    	 logger.info("Attempting to find member with ID: " + memberId);

        // memberId로 Member 객체를 조회 (findByMemberNo 사용)
        MemberVO member = memberRepository.findByMemberNo(memberId)
            .orElseThrow(() -> new RuntimeException("Member with ID " + memberId + " not found"));

        logger.info("Member found: " + member.getMemberName());
        // 새로운 QuizVo 객체 생성
        QuizVo quiz = new QuizVo();
        
        // quizVo에서 나머지 값들을 설정
        quiz.setQuizQuestion(quizVo.getQuizQuestion());
        quiz.setQuizCorrectAnswer(quizVo.getQuizCorrectAnswer());
        quiz.setQuizHint(quizVo.getQuizHint());
        quiz.setQuizDifficulty(quizVo.getQuizDifficulty());
        quiz.setQuizTotalScore(quizVo.getQuizTotalScore());
        quiz.setQuizCorrectCount(quizVo.getQuizCorrectCount());
        quiz.setQuizRank(quizVo.getQuizRank());
        
        quiz.setQuizCreateAt(new Date());  // 현재 날짜로 퀴즈 생성일 설정
        quiz.setQuizLastUpdate(new Date());  // 현재 날짜로 마지막 업데이트 설정
        
        // quiz 객체에 member 설정
        quiz.setMember(member);

        return quizRepository.save(quiz);
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
    @Transactional
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
            existingQuiz.setQuizLastUpdate(new Date());  // 업데이트 시 마지막 수정일 설정
            return quizRepository.save(existingQuiz);
        } else {
            return null;
        }
    }

    // 퀴즈 삭제
    @Transactional
    public boolean deleteQuiz(int quizId) {
        if (quizRepository.existsById(quizId)) {
            quizRepository.deleteById(quizId);
            return true;
        } else {
            return false;
        }
    }
}