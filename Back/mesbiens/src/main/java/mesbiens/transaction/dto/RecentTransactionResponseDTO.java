package mesbiens.transaction.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import mesbiens.transaction.vo.TransactionType;

// 최근 거래 내역 페이지에 전달할 때 사용할 DTO
@Getter
public class RecentTransactionResponseDTO {
	private LocalDateTime trnsDate; // 거래 일자
	private String bankName; // 은행명
	private String accountNumber; // 계좌번호
	private String memberName; // 거래 대상
	private String trnsMemo; // 거래 내용
	private String categoryName; // 소비 카테고리명
	private Long trnsBalance; // 거래 금액
	private TransactionType trnsTypeName; // 거래 유형명
	
	public RecentTransactionResponseDTO(
		LocalDateTime trnsDate, String bankName, String accountNumber,
		String memberName, String trnsMemo, String categoryName,
		Long trnsBalance, TransactionType trnsTypeName
	) {
		this.trnsDate = trnsDate;
		this.bankName = bankName;
		this.accountNumber = accountNumber;
		this.memberName = memberName;
		this.trnsMemo = trnsMemo;
		this.categoryName = categoryName;
		this.trnsBalance = trnsBalance;
		this.trnsTypeName = trnsTypeName;
	}
	
}
