package mesbiens.shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import mesbiens.shop.vo.ProductVO;

public interface ProductRepository extends JpaRepository<ProductVO, Integer> {

	List<ProductVO> findByProductCategory(String category);

}
