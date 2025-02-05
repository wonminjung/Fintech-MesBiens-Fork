package mesbiens.transaction.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RecentTransactionRequestDTO {
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate recentStartDate;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate recentEndDate;
	
}
