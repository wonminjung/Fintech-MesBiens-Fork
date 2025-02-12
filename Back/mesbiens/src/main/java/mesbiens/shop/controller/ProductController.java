package mesbiens.shop.controller;

import mesbiens.shop.dto.ProductDTO;
import mesbiens.shop.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shop")
@CrossOrigin(origins = "http://localhost:4000") // React 개발 서버 허용(하나의 URL에서 두개의 페이지를 불러올경우 CORS 방지)
public class ProductController {

	@Autowired
    private ProductService productService;

    // 전체 상품 목록 조회
    @GetMapping("/category/All")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
    	System.out.println("📢 API 요청 받음: /shop/category/All"); // 요청 확인 로그
        List<ProductDTO> products = productService.getAllProducts();
        System.out.println("📢 반환할 데이터: " + products); // 반환 데이터 로그
        return ResponseEntity.ok(productService.getAllProducts());
    }
    
    // 특정 카테고리 상품 목록 조회
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategory(@PathVariable(name = "category") String category) {
    	return ResponseEntity.ok(productService.getProductsByCategory(category));
    }

    // 상품 상세 조회
    @GetMapping("/product/{productNo}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable(name = "productNo") int productNo) {
    	ProductDTO product = productService.getProductById(productNo);
        return ResponseEntity.ok(product);
    }
}
