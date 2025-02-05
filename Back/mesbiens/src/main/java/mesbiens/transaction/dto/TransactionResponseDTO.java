package mesbiens.transaction.dto;

import lombok.Getter;
import mesbiens.transaction.vo.ConsumptionCategoryVO;
import mesbiens.transaction.vo.TransactionDetailVO;
import mesbiens.transaction.vo.TransactionType;

@Getter
public class TransactionResponseDTO {
	private int transactionNo; // 거래내역 No
	private int receiverAccountNo; // 수신계좌
	private int senderAccountNo; // 송신계좌
	private ConsumptionCategoryVO consumptionCateNo; // 소비 카테고리 코드
	private TransactionType trnsTypeName; // 거래 유형명
	private Long trnsBalance; // 거래 금액
	private String trnsPlace; // 거래 점포
	private String trnsMemo; // 거래 메모
	private String trnsCreateAt; // 거래 시간
	
	public TransactionResponseDTO(TransactionDetailVO trns) {
		this.transactionNo = trns.getTransactionNo();
		this.receiverAccountNo = trns.getReceiverAccountNo().getAccountNo();
		this.senderAccountNo = trns.getSenderAccountNo().getAccountNo();
		this.consumptionCateNo = trns.getConsumptionCateNo();
		this.trnsTypeName = trns.getTrnsTypeName();
		this.trnsBalance = trns.getTrnsBalance();
		this.trnsPlace = trns.getTrnsPlace();
		this.trnsMemo = trns.getTrnsMemo();
		this.trnsCreateAt = trns.getTrnsCreateAt().toString();
	}
}
