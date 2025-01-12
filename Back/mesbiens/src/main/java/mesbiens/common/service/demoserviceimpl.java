package mesbiens.common.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mesbiens.common.dao.demodao;
import mesbiens.common.vo.demovo;

@Service
public class demoserviceimpl implements demoservice {

	@Autowired
	demodao demodao;
	
	@Override
	public void insert(demovo vo) {
		demodao.insert(vo);
	}

}
