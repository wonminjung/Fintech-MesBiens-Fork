package mesbiens.shop.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import mesbiens.shop.repository.ProductRepository;
import mesbiens.shop.vo.ProductVO;

@Repository
public class ProductDAOImpl implements ProductDAO {
	
	@Autowired
	private ProductRepository productRepository;

	// 전체 카테고리 조회
	@Override
	public List<ProductVO> getAllProducts() {
		return productRepository.findAll();
	}

	// 특정 카테고리 조회
	@Override
	public List<ProductVO> getProductsByCategory(String category) {
		return productRepository.findByProductCategory(category);
	}

	// 상품 상세보기
	@Override
	public Optional<ProductVO> getProductById(int productNo) {
		return productRepository.findById(productNo);
	}
}
