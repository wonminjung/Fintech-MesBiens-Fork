package mesbiens.shop.dto;

import lombok.Getter;
import lombok.Setter;
import mesbiens.shop.vo.ProductVO;

@Getter
@Setter
public class ProductDTO {
    private int productNo; // 상품 고유번호
    private String productName; // 상품명
    private int productPrice; // 상품 가격
    private String productCategory; // 상품 카테고리
    private String productDescription; // 상품 설명
    private String productImageUrl; // 상품 이미지 URL
    private int productStock; // 상품 재고량

    // Entity → DTO 변환
    public static ProductDTO fromEntity(ProductVO product) {
        ProductDTO dto = new ProductDTO();
        dto.setProductNo(product.getProductNo());
        dto.setProductName(product.getProductName());
        dto.setProductPrice(product.getProductPrice());
        dto.setProductCategory(product.getProductCategory());
        dto.setProductDescription(product.getProductDescription());
        dto.setProductImageUrl(product.getProductImageUrl());
//        dto.setProductStock(product.getProductStock());
        return dto;
    }
}
