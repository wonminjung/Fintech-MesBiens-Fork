package mesbiens.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import mesbiens.vo.demovo;

@Repository
public class demodaoimpl implements demodao {

	@Autowired
	demoRepository demorepo;
	
	@Override
	public void insert(demovo vo) {
		
		demorepo.save(vo);
	}

}
