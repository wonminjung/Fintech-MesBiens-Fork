package mesbiens.account.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mesbiens.account.dto.AccountResponseDTO;
import mesbiens.account.service.AccountService;
import mesbiens.account.vo.AccountVO;

@RestController
@RequestMapping("/account")
public class AccountController {
	
	@Autowired
	private AccountService acctService;
	
	// 모든 계좌 가져오기
	@GetMapping
	public List<AccountResponseDTO> getAcctInfo() {
		
		List<AccountVO> accounts = acctService.getAllAcct();
		List<AccountResponseDTO> response = new ArrayList<>();
		
		accounts.stream().forEach((account) -> {
			AccountResponseDTO res = new AccountResponseDTO(account);
			response.add(res);
		});
		
		return response;
	}
	
	// 계좌 추가하기
	@PostMapping("/add")
	public ResponseEntity<Map<String, String>> addAcct(@RequestBody AccountVO acct) {
		Map<String, String> response = new HashMap<>();
		
		if(acct == null) {
			response.put("message", "계좌 정보가 제공되지 않았습니다.");
			return ResponseEntity.badRequest().body(response);
		}
		
		boolean result = acctService.addAcct(acct);
		if(result) {
			response.put("message", "계좌 추가가 완료되었습니다.");
			return ResponseEntity.ok(response);
		}
		
		response.put("message", "계좌 추가에 실패하였습니다.");
		return ResponseEntity.badRequest().body(response);
	}
	
	// 계좌 삭제하기
	@DeleteMapping("/delete")
	public ResponseEntity<Map<String, String>> delAcct(@RequestBody AccountVO acct) {
		Map<String, String> response = new HashMap<>();
		
		if(acct == null) {
			response.put("message", "계좌 번호가 제공되지 않았습니다.");
			return ResponseEntity.badRequest().body(response);
		}
		
		boolean isDeleted = acctService.delAcct(acct.getAccountNo());
		if(isDeleted) {
			response.put("message", "계좌 정보 삭제가 완료되었습니다.");
			return ResponseEntity.ok().body(response);
		}
		
		response.put("message", "계좌 정보 삭제에 실패하였습니다.");
		return ResponseEntity.badRequest().body(response);
	}
	
}























