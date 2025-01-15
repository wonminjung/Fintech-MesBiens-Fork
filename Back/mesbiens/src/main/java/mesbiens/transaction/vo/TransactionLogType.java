package mesbiens.transaction.vo;

// TransactionLogVO Entity Bean 클래스에서 사용할 로그 상태 Enum 클래스

public enum TransactionLogType {
	// 수정
	UPDATE,
	// 생성
	INSERT,
	// 취소
	CANCEL,
	// 환불
	REFUND
}
