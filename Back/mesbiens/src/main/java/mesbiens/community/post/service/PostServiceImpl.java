package mesbiens.community.post.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import mesbiens.community.post.dao.PostDAO;
import mesbiens.community.post.vo.PageVO;
import mesbiens.community.post.vo.PostRequestDTO;
import mesbiens.community.post.vo.PostVO;
import mesbiens.member.vo.MemberVO;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostDAO postDAO;
	
//	 @Autowired
//	private ServletContext servletContext; // ServletContext 주입
	
	// 게시판 저장시 이름을 순차적인 숫자를 넣기위한 카운터
	private static final String COUNTER_FILE_PATH = "src/main/webapp/upload/counter.txt"; // 카운터 파일 위치

	// 게시판 글쓰기
	@Override
	public Map<String, Object> getPostWritePage(int page) {
		Map<String, Object> response = new HashMap<>();
        response.put("page", page);
        // page 값을 받아서 JSON 형식으로 반환.
        
        return response;
	}

	// 게시판 저장
	@Transactional
	@Override
	public void insertPost(PostRequestDTO postRequest, HttpServletRequest request) throws Exception {
		
		PostVO postVO = new PostVO();
		postVO.setPostNo(0);
		postVO.setPostTitle(postRequest.getPostTitle());
	    postVO.setPostCont(postRequest.getPostCont());
	    postVO.setFindField(postRequest.getFindField());
	    postVO.setFindName(postRequest.getFindName());
	    postVO.setPostModify(postRequest.getPostModify());
	    
	    MemberVO member = new MemberVO();
	    member.setMemberNo(2); // 실제 존재하는 회원 ID로 설정 (테스트용)
	    postVO.setMemberNo(member);
		
		String uploadFolder = request.getServletContext().getRealPath("/upload");
		// 업로드될 파일의 디렉터리의 실제경로(RealPath)를 읽어옴

        MultipartFile uploadFile = postRequest.getUploadFile(); // 업로드될 파일이름을 받아옴

        // 업로드 파일이 있을경우 만 동작
        if (!uploadFile.isEmpty()) {
        	
            String fileName = uploadFile.getOriginalFilename(); // 사용자가 업로드한 원본 파일명을 가져옴

            Calendar cal = Calendar.getInstance();
            int year = cal.get(Calendar.YEAR);
            int month = cal.get(Calendar.MONTH) + 1;
            int date = cal.get(Calendar.DATE);
            
            String today = String.format("%04d-%02d-%02d", year, month, date);
            // YYYYMMDD(10진수) 방식으로 이름 문자열 방식으로 지정한다. 
            
            String homedir = uploadFolder + "/" + today;
            // homedir 의 경로로 uploadFolder/오늘날짜 를 지정한다.

            File path01 = new File(homedir);
            // "path01"파일을 uploadFolder"현재날짜" 이름으로 지정
            if (!path01.exists()) {
                path01.mkdir();
            }
            // path01로 지정된 "uploadFolder/today" 폴더가 없다면 폴더를 생성해라


         // **파일 카운터 로드 및 업데이트**
            int fileCounter = getFileCounter(today);
            String fileCounterStr = String.format("%06d", fileCounter); // 6자리 숫자 포맷
            updateFileCounter(today, fileCounter + 1); // 카운터 증가
            int index = fileName.lastIndexOf(".");
            String fileExtension = (index != -1) ? fileName.substring(index + 1) : ""; // 확장자
                        
            // **파일명 생성 (bbsYYYYMMDD_000000.확장자)**
            String refFileName = "mesbiens" + year + month + date + "_" + fileCounterStr + "." + fileExtension;
            String postFilePath = "/" + today + "/" + refFileName;

            File saveFile = new File(homedir + "/" + refFileName); // 저장될 파일의 이름및 경로를 지정
            // upload/현재날짜 폴더/PostYYYYMMDD[random].확장자 형식으로 지정
            
//            System.out.println("파일 저장 경로 : "+homedir);
//            System.out.println("파일 저장 경로: " + homedir + "/" + refFileName);
//            System.out.println("파일 존재 여부: " + saveFile.exists());
//            System.out.println("Upload 파일 명 : "+uploadFile.getOriginalFilename());
//        	System.out.println("Upload 파일 크기 : "+uploadFile.getSize());
//        	System.out.println("Upload 파일 이름/확장자 : "+uploadFile.getContentType());
//        	System.out.println("쓰기 권한 여부: " + saveFile.canWrite());
        	
        	postVO.setPostFilePath(postFilePath); // 저장될 파일 경로
            postVO.setPostFileName(refFileName); // 저장될 파일 이름
            postVO.setPostFileSize(uploadFile.getSize()); // 저장될 파일 크기
            
            String[] parts = postFilePath.split("/");
            if (parts.length == 2) {
                String fileType = parts[1];
                System.out.println(fileType);  // 결과: png
                postVO.setPostFileType(fileType);
            } // 저장될 파일 확장자
            
            
            
        	// 동일한 파일명 존재시
        	if (saveFile.exists()) {
        	    saveFile.delete(); // 기존 파일 삭제
        	}
        	
            try {
            	uploadFile.transferTo(saveFile);
            } catch (Exception e) {
            	throw new RuntimeException("파일 업로드 중 오류 발생" + e.getMessage(), e);
            }
        } else {
        	// 첨부파일이 없는 경우
            postRequest.setPostFile("");
        }

        postDAO.insertPost(postVO);	
	}// 게시판 저장
	
	// 게시판 저장
	// **파일 카운터 읽기**
    private int getFileCounter(String today) {
        File counterFile = new File(COUNTER_FILE_PATH);
        if (!counterFile.exists()) {
            return 0; // 파일이 없으면 초기값 0
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(counterFile))) {
            String line;
            while ((line = reader.readLine()) != null) {
            	// lin = reader.readLine() : counterFile의 내용을 줄 단위 처리한다.
                String[] parts = line.split(":");
                // 줄 단위로 읽어들인 내용을 " : " 을 기준으로 분리한다. 
                if (parts.length == 2 && parts[0].equals(today)) {
                	// 분리된 개수가 2개 이면서 분리된 첫번째 값이 오늘 날짜와 같다면
                    return Integer.parseInt(parts[1]);
                    // 
                }
            }
        } catch (IOException | NumberFormatException e) {
            e.printStackTrace();
        }
        return 0; // 날짜에 해당하는 카운터 없으면 0
    }
    
    // 게시판 저장
    // **파일 카운터 업데이트**
    private synchronized void updateFileCounter(String today, int newCounter) {
    	// synchronized : 다중 요청(동시 파일 접근) 환경에서도 안전하게 카운터 동기화
    	
        File counterFile = new File(COUNTER_FILE_PATH);

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(counterFile, false))) { // 덮어쓰기
        	// FileWriter(file, valid) 로 덮어쓰기 모드 실행 여부 결정
        	
            writer.write(today + ":" + newCounter);
            writer.newLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }	
	

	// 게시판 목록
    @Override
    public Map<String, Object> getPostList(int page, int limit) {
    	
        // 검색 및 페이징 정보 설정
        PageVO pageVO = new PageVO();
        
        pageVO.setStartrow((page - 1) * limit + 1);
        pageVO.setEndrow(pageVO.getStartrow() + limit - 1);

        // 전체 데이터 개수 조회
        int totalCount = postDAO.getRowCount(pageVO);
        List<PostVO> plist = this.postDAO.getPostList(pageVO);

        // 페이징 처리 로직
        int maxpage = (int) ((double) totalCount / limit + 0.95);
        int startpage = (((int) ((double) page / 10 + 0.9)) - 1) * 10 + 1;
        int endpage = Math.min(startpage + 10 - 1, maxpage);

        // 결과를 Map에 담아서 반환
        Map<String, Object> response = new HashMap<>();
        response.put("plist", plist);
        response.put("page", page);
        response.put("startpage", startpage);
        response.put("endpage", endpage);
        response.put("maxpage", maxpage);
        response.put("totalCount", totalCount);

        return response;
    } // 게시판 목록

    // 조회수 증가 게시글 상세보기
	@Override
	public PostVO getPostWithViewIncrease(int postNo) {
		postDAO.increaseViewCount(postNo); // 조회수 증가
        return postDAO.getPostById(postNo); // 게시글 조회
	}

	// 조회수 증가 없이 조회수 증가 게시글 상세보기
	@Override
	public PostVO getPostWithoutViewIncrease(int postNo) {
		return postDAO.getPostById(postNo); // 조회수 증가 없이 조회
	}

	// 조회수 증가
	@Override
	public void increaseViewCount(int postNo) {
		postDAO.increaseViewCount(postNo); // 조회수 증가
	}

	// 게시글 수정
	@Override
	public void editPost(int postNo, PostRequestDTO postRequest, MultipartFile uploadFile, HttpServletRequest request) {
		
		PostVO postVO = postDAO.getPostById(postNo);

        if (!postVO.getMemberNo().equals(postRequest.getMemberNo())) {
            throw new RuntimeException("사용자 계정이 일치하지 않습니다.");
        }
        
        String uploadFolder = request.getServletContext().getRealPath("/upload");
        String postFilePath = "";

        if (uploadFile != null && !uploadFile.isEmpty()) { // 첨부파일이 존재한다면
            String refFileName = uploadFile.getOriginalFilename(); // 첨부파일의 원본파일명 불러오기
            File delFile = new File(uploadFolder + "/" + postVO.getPostFileName()); // uploadFolder/파일 이름 으로 파일 만들기

            if (delFile.exists()) {
                delFile.delete(); // 기존 파일 삭제
            }

            // 날짜 기반 폴더 생성
            Calendar cal = Calendar.getInstance();
            int year = cal.get(Calendar.YEAR);
            int month = cal.get(Calendar.MONTH) + 1;
            int date = cal.get(Calendar.DATE);

            String today = String.format("%04d-%02d-%02d", year, month, date);
            // YYYYMMDD(10진수) 방식으로 이름 문자열 방식으로 지정한다. 
            
            String homedir = uploadFolder + "/" + today;
            // homedir 의 경로로 uploadFolder/오늘날짜 를 지정한다.

            File path01 = new File(homedir);
            // "path01"파일을 uploadFolder"현재날짜" 이름으로 지정
            if (!path01.exists()) {
                path01.mkdir();
            }
            // path01로 지정된 "uploadFolder/today" 폴더가 없다면 폴더를 생성해라


            // **파일 카운터 로드 및 업데이트**
            int fileCounter = getFileCounter(today);
            String fileCounterStr = String.format("%06d", fileCounter); // 6자리 숫자 포맷
            updateFileCounter(today, fileCounter + 1); // 카운터 증가
            int index = refFileName.lastIndexOf(".");
            String fileExtension = (index != -1) ? refFileName.substring(index + 1) : ""; // 확장자
                        
            // **파일명 생성 (bbsYYYYMMDD_000000.확장자)**
            String modiFileName = "bbs" + year + month + date + "_" + fileCounterStr + "." + fileExtension;
            postFilePath = "/" + today + "/" + modiFileName;

            postVO.setPostFileName(postFilePath);

            File saveFile = new File(homedir + "/" + modiFileName); // 저장될 파일의 이름및 경로를 지정
            // upload/현재날짜 폴더/PostYYYYMMDD[random].확장자 형식으로 지정
            
            try {
            	uploadFile.transferTo(saveFile);
            } catch (Exception e) {
            	throw new RuntimeException("파일 업로드 중 오류 발생", e);
            }
        } else {
        	postRequest.setPostFile("");
        }

        postRequest.setPostNo(postNo);
        postRequest.setPostFileName(postFilePath);
        postDAO.updatePost(postVO);
    } // 게시글 수정
	
	
}
