package mesbiens.shop.service;

import java.util.Map;

import mesbiens.shop.dto.ShopRequestDTO;

public interface ShopService {

	Map<String, Object> getPurchaseList(ShopRequestDTO shopRequest);

	void processPayment(ShopRequestDTO shopRequest);

}
