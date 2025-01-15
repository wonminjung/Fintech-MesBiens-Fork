package mesbiens.community.quiz.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import mesbiens.community.quiz.vo.QuizVo;

public interface QuizRepository extends JpaRepository<QuizVo, Integer> {
	
	 List<QuizVo> findByMember_memberNo(int memberNo);  // 사용자 ID로 퀴즈 조회
	 List<QuizVo> findByQuizDifficulty(String difficulty);  // 난이도로 퀴즈 조회

}
