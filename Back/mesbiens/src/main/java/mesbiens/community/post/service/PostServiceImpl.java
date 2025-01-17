package mesbiens.community.post.service;

import java.io.File;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import mesbiens.community.post.dao.PostDAO;
import mesbiens.community.post.vo.PageVO;
import mesbiens.community.post.vo.PostVO;
import mesbiens.community.post.vo.PostVO2;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostDAO postDAO;

	// 게시판 글쓰기
	@Override
	public Map<String, Object> getPostWritePage(int page) {
		Map<String, Object> response = new HashMap<>();
        response.put("page", page);
        // page 값을 받아서 JSON 형식으로 반환.
        
        return response;
	}

	// 게시판 저장
	@Override
	public void insertPost(PostVO post, PostVO2 post2, HttpServletRequest request) throws Exception {
		String uploadFolder = request.getSession().getServletContext().getRealPath("upload");

        MultipartFile uploadFile = post2.getUploadFile();

        // 업로드 파일이 없을경우
        if (!uploadFile.isEmpty()) {
            String fileName = uploadFile.getOriginalFilename();

            Calendar cal = Calendar.getInstance();
            int year = cal.get(Calendar.YEAR);
            int month = cal.get(Calendar.MONTH) + 1;
            int date = cal.get(Calendar.DATE);

            String homedir = uploadFolder + "/" + year + "-" + month + "-" + date;

            File path01 = new File(homedir);
            if (!path01.exists()) {
                path01.mkdir();
            }

            Random r = new Random();
            int random = r.nextInt(100000000);

            int index = fileName.lastIndexOf(".");
            String fileExtension = fileName.substring(index + 1);
            String refFileName = "bbs" + year + month + date + random + "." + fileExtension;
            String fileDBName = "/" + year + "-" + month + "-" + date + "/" + refFileName;

            post.setPostFile(fileDBName);

            File saveFile = new File(homedir + "/" + refFileName);
            uploadFile.transferTo(saveFile);
        } else {
            post.setPostFile("");
        }

        postDAO.insertPost(post);
		
	}

	// 게시판 목록
	@Override
	public Map<String, Object> getPostList(int page, String findField, String findName) {
		int limit = 10; // 한 페이지에 보여질 게시글 개수
        int startRow = (page - 1) * limit + 1;
        int endRow = startRow + limit - 1;

        PageVO p = new PageVO();
        p.setFindField(findField); 
        p.setFindName(findName != null ? "%" + findName + "%" : null);
        p.setStartrow(startRow);
        p.setEndrow(endRow);

        int totalCount = postDAO.getRowCount(p); // 전체 게시글 개수
        List<PostVO> blist = postDAO.getBbsList(p); // 검색 및 페이징된 게시글 목록

        // 페이지네이션 계산
        int maxPage = (int) ((double) totalCount / limit + 0.95);
        int startPage = (((int) ((double) page / 10 + 0.9)) - 1) * 10 + 1;
        int endPage = Math.min(startPage + 10 - 1, maxPage);

        // JSON 응답 데이터 구성
        Map<String, Object> response = new HashMap<>();
        response.put("blist", blist);
        response.put("page", page);
        response.put("startpage", startPage);
        response.put("endpage", endPage);
        response.put("maxpage", maxPage);
        response.put("totalCount", totalCount);
        response.put("find_field", findField);
        response.put("find_name", findName);

        return response;
	}



	
	
	
}
