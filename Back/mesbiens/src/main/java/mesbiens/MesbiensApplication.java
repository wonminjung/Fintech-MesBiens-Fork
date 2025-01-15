package mesbiens;

import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import mesbiens.common.util.WalletUtil;

@SpringBootApplication
public class MesbiensApplication {

	public static void main(String[] args) throws IOException {
		
		// Wallet 경로 설정 (2025-01-06 작성)
        String walletPath = WalletUtil.extractWalletToTemp();
        System.setProperty("oracle.net.tns_admin", walletPath);
        // 여기까지

        SpringApplication.run(MesbiensApplication.class, args);
	}

}
