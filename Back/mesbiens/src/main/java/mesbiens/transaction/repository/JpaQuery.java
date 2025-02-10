package mesbiens.transaction.repository;

// TransactionDetailRepository 에서 사용할 쿼리를 정적 상수로 가지는 클래스

public class JpaQuery {
	public static final String RECENT_QUERY = """
		select new mesbiens.transaction.dto.RecentTransactionResponseDTO(
			t.trnsCreateAt,
			b.bankName,
			acct.accountNumber,
			m.memberName,
			t.trnsMemo,
			cate.categoryName,
			t.trnsBalance,
			t.trnsTypeName
		)
		from TransactionDetailVO t
		join t.receiverAccountNo acct
		join acct.bankCode b
		join acct.memberNo m
		join t.consumptionCateNo cate
		where m.memberNo = :memberNo 
		and t.trnsCreateAt between :startDate and :endDate
	""";
}
