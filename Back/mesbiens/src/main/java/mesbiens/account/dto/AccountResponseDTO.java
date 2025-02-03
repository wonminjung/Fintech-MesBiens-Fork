package mesbiens.account.dto;

import lombok.Getter;
import mesbiens.account.vo.AccountVO;

// 불변 객체를 유지하기 위해 Getter 메소드만 설정
@Getter
public class AccountResponseDTO {
	private int accountNo; // 계좌 No
	private int memberNo; // 회원 No
	private String bankCode; // 은행 코드
	private Long accountBalance; // 계좌 잔액
	private String accountOpeningDate; // 계좌 개설일
	
	public AccountResponseDTO(AccountVO account) {
		this.accountNo = account.getAccountNo();
		this.memberNo = account.getMemberNo().getMemberNo();
		this.bankCode = account.getBankCode().getBankCode();
		this.accountBalance = account.getAccountBalance();
		this.accountOpeningDate = account.getAccountOpeningDate().toString();
	}
	
}
