package mesbiens.transaction.repository;

// TransactionDetailRepository 에서 사용할 쿼리를 정적 상수로 가지는 클래스

public class JpaQuery {
	public static final String RECENT_QUERY = """
		select new mesbiens.transaction.dto.RecentTransactionResponseDTO(
			t.trnsCreateAt,
			b.bankName,
			sacct.accountNumber,
			rm.memberName,
			t.trnsMemo,
			cate.categoryName,
			t.trnsBalance,
			t.trnsTypeName
		)
		from TransactionDetailVO t
		join t.senderAccountNo sacct
		join sacct.bankCode b
		join sacct.memberNo sm
		join t.receiverAccountNo racct
		join racct.memberNo rm
		join t.consumptionCateNo cate
		where sm.memberNo = :memberNo and t.trnsCreateAt between :startDate and :endDate
	""";
}
