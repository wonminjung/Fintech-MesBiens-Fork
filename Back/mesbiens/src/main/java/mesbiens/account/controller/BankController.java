package mesbiens.account.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mesbiens.account.service.BankService;
import mesbiens.account.vo.BankInfoVO;

@RestController
@RequestMapping("/allBankList")
@CrossOrigin(origins = "http://localhost:4000")
public class BankController {
	
	@Autowired
	private BankService bankService;
	
	// 모든 뱅크 리스트 가져오기
	@GetMapping
	public List<BankInfoVO> getAllBankList() {
		return bankService.getAllBankList();
	}
}
