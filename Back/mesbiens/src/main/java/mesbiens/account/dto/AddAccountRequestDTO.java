package mesbiens.account.dto;

import lombok.Getter;

@Getter
public class AddAccountRequestDTO {
	private int memberNo;
	private String bankName;
	private String accountNumber;
	private String accountPassword;
	
}
