package mesbiens.common.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class WalletUtil {
    public static String extractWalletToTemp() throws IOException {
        // 임시 디렉토리 생성
        Path tempDir = Files.createTempDirectory("Wallet_mesbiens");
        
        // Wallet 디렉토리 경로 (src/main/resources에서 복사)
        Path walletDir = Path.of("src/main/resources/Wallet_mesbiens");
        
        // 파일 복사
        Files.walk(walletDir).forEach(source -> {
            try {
                Path destination = tempDir.resolve(walletDir.relativize(source));
                if (Files.isDirectory(source)) {
                    Files.createDirectories(destination);
                } else {
                    Files.copy(source, destination);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        // 복사된 임시 디렉토리 경로 반환
        return tempDir.toString();
    }
}

