package mesbiens.transaction.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

// 소비 카테고리 Entity Bean 클래스

@Setter
@Getter
@ToString
@EqualsAndHashCode(of = "consumptionCateNo")
@Entity
@Table(name = "consumption_category")
@SequenceGenerator(
	name = "consumptioncategory_no_seq_generator",
	sequenceName = "consumptioncategory_no_seq",
	initialValue = 1,
	allocationSize = 1
)
public class ConsumptionCategoryVO {
	@Id
	@Column(name="consumption_cate_no")
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "consumptioncategory_no_seq_generator"
	)
	private int consumptionCateNo; // 소비 카테고리 고유 번호
	
	@Column(name="category_name", nullable = false)
	private String categoryName; // 카테고리명
	
	@Column(name="icon_path", nullable = false)
	private String iconPath; // 아이콘 경로
	
	
}






