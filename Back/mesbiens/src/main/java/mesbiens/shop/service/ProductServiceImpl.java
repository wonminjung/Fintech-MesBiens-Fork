package mesbiens.shop.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import mesbiens.shop.dao.ProductDAO;
import mesbiens.shop.dto.ProductDTO;
import mesbiens.shop.vo.ProductVO;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductDAO productDAO;
	
	@Override
	public List<ProductDTO> getAllProducts() {
		List<ProductVO> products = productDAO.getAllProducts();
		System.out.println(products);
		if (products == null || products.isEmpty()) {
	        throw new RuntimeException("⚠ 데이터가 없습니다!");
	    }
		return products.stream() // List<ProductVO>를 스트림 객체로 변환
				.map(ProductDTO::fromEntity) // VO객체를 DTO객체로 변환하기 위한 fromEntity메소드 호출
				.collect(Collectors.toList()); // 변환된 DTO객체를 새로운 List<ProductDTO>에 담아 return
	}

	@Override
	public List<ProductDTO> getProductsByCategory(String category) {
		List<ProductVO> products = productDAO.getProductsByCategory(category);
		System.out.println(products);
		return products.stream() 
				.map(ProductDTO::fromEntity)
				.collect(Collectors.toList());
	}

	@Override
	public ProductDTO getProductById(int productNo) {
		ProductVO product = productDAO.getProductById(productNo)
				.orElseThrow(() -> new IllegalArgumentException("해당 상품은 없습니다"));
		System.out.println(product);
		return ProductDTO.fromEntity(product);
	}

}
