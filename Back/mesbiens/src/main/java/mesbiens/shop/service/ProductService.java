package mesbiens.shop.service;

import java.util.List;

import mesbiens.shop.dto.ProductDTO;

public interface ProductService {

	List<ProductDTO> getAllProducts();

	List<ProductDTO> getProductsByCategory(String category);

	ProductDTO getProductById(int productNo);

}
