package mesbiens.bank.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

// 은행 정보 Entity Bean 클래스

@Setter
@Getter
@ToString
@EqualsAndHashCode(of = "bankCode")
@Entity
@Table(name = "bankinfo")
public class BankInfoVO {
	@Id
	private String bankCode; // 은행 식별 코드
	
	@Column(nullable = false)
	private String bankName; // 은행명
	
	@Column(nullable = false)
	private String bankLogo; // 은행 로고 경로
}
