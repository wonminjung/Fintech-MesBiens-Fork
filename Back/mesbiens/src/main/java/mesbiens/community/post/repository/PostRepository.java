package mesbiens.community.post.repository;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mesbiens.community.post.vo.PostVO;

@Repository
public interface PostRepository extends JpaRepository<PostVO, Integer> {
	
	// JpaRepository를 상속받아 기본 CRUD 메서드 제공
	
	// 게시판 저장
	@Query(value="select post_no_seq.nextval from dual", nativeQuery=true)
	int getPostNextSequenceValue(); // post_no_seq 시퀀스 다음번호값 가져오기
	
	// 게시판 목록
	// 게시물 개수 조회(검색 필터)
	@Query("SELECT COUNT(p) FROM PostVO p WHERE " +
			// PostVO 테이블을 p로 별칭 지정 후 조건에 맞는 p 의 개수를 센다
	           "(:findField IS NULL OR :findField = '' OR " +
			// findField 가 Null 이거나 ''(빈문자열)이라면
	           "( :findField = 'PostTitle' AND p.postTitle LIKE %:findName% ) OR " +
			// findField 가 PostTitle 이면서 해당 postTitle의 값이 %찾고자 하는 이름% 이라면
	           "( :findField = 'PostCont' AND p.postCont LIKE %:findName% ))")
			// findField 가 PostContent 이면서 해당 postContent의 값이 %찾고자 하는 이름% 이라면
	long countByFindField(@Param("findField") String findField, @Param("findName") String findName);

	@Query("SELECT p FROM PostVO p JOIN FETCH p.member")
    Page<PostVO> findAllPosts(Pageable pageable);

	
	// 게시판 목록
	// 게시물 리스트 조회 (페이징 + 검색)
	@Query("SELECT p FROM PostVO p WHERE p.postTitle LIKE %:findField% OR p.postCont LIKE %:findName%")
	Page<PostVO> searchPosts(@Param("findField") String findField, @Param("findName") String findName, Pageable pageable);

	// 게시글 첨부파일 여부 확인하여 목록에서 표기
	@Query("SELECT f.postFile FROM PostVO f WHERE f.postNo = :postNo")
	int getUploadFileValidCount(@Param("postNo") int postNo);


	
}
