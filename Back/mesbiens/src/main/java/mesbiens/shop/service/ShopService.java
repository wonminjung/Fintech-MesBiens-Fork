package mesbiens.shop.service;

import java.util.List;
import java.util.Map;

import mesbiens.account.dto.AccountResponseDTO;
import mesbiens.shop.dto.ShopRequestDTO;

public interface ShopService {

	Map<String, Object> getPurchaseList(ShopRequestDTO shopRequest);

	void processPayment(ShopRequestDTO shopRequest);

	List<AccountResponseDTO> getAccountsByMember(int memberNo);

}
