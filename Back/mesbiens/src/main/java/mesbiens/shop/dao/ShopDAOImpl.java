package mesbiens.shop.dao;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import mesbiens.shop.repository.ShopRepository;
import mesbiens.shop.vo.ShopVO;

@Repository
public class ShopDAOImpl implements ShopDAO {
	
	@Autowired
	private ShopRepository shopRepository;

	@Override
	public void savePayment(ShopVO shop) {
		shopRepository.save(shop);
	}
}
