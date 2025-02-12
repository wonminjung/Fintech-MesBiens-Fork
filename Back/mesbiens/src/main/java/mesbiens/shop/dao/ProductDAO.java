package mesbiens.shop.dao;

import java.util.List;
import java.util.Optional;

import mesbiens.shop.vo.ProductVO;

public interface ProductDAO {

	// 전체품목 조회
	List<ProductVO> getAllProducts();

	// 카테고리별 조회
	List<ProductVO> getProductsByCategory(String category);

	// 특정 상품 조회
	Optional<ProductVO> getProductById(int productNo);

}
