package mesbiens.account.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mesbiens.account.service.AccountService;
import mesbiens.account.vo.AccountVO;

@RestController
@CrossOrigin(origins = "http://localhost:4000")
@RequestMapping("/account")
public class AccountController {
	
	@Autowired
	private AccountService acctService;
	
	@GetMapping
	public List<AccountVO> getAcctInfo() {
		return acctService.getAcctInfo();
	}
	
	@PostMapping("/add")
	public void addAcct(@RequestBody AccountVO acct) {
		System.out.println(acct);
		acctService.addAcct(acct);
	}
}
