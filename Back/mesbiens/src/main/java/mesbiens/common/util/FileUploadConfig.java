package mesbiens.common.util;


import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;

import jakarta.servlet.MultipartConfigElement;

@Configuration
public class FileUploadConfig {
	
	@Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setMaxFileSize(DataSize.ofMegabytes(10)); // 최대 10MB 업로드 가능
        factory.setMaxRequestSize(DataSize.ofMegabytes(20)); // 요청 최대 크기 20MB
        return factory.createMultipartConfig();
    }

	
	
}
