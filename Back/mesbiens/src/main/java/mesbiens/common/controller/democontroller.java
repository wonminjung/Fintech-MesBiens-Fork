package mesbiens.common.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import mesbiens.common.dao.demoRepository;
import mesbiens.common.service.demoservice;
import mesbiens.common.vo.demovo;

import java.util.List;

@RestController
@RequestMapping("/users")
public class democontroller {

    @Autowired
    private demoRepository demoRepository;
    
    @Autowired
    private demoservice demoservice;

    // Create User
    @PostMapping("/insertdemo")
	    // @ReuqestBody MessageVO vo는 전송된 JSON 데이터를 MessageVO 객체 타입으로 변환을 해준다.
	    public ResponseEntity<String> insertM(@RequestBody demovo vo) {
	    ResponseEntity<String> entity = null;
    	      
    	      try {
    	         // 메시지 추가가 성공하면 SUCCESS 문자와 HttpStatus.OK 코드인 200 상태코드를 응답한다.
    	         entity = new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    	      }catch(Exception e) {
    	         e.printStackTrace();
    	         entity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    	      }
    	      

    	
    	
    	
    	//System.out.println(demovo);
    	
    	return entity;
    	// return demoRepository.save(demovo);
    }
    
    @PostMapping("/insertdemodemo")
    public void demo_wirte_test(demovo vo) {
    	
    	
    	
    	demoservice.insert(vo);
    	
    }
 
    // Get All Users
    @GetMapping("/")
    public List<demovo> getAllUsers() {
        return demoRepository.findAll();
    }
}
