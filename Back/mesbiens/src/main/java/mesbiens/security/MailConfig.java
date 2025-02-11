package mesbiens.security;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {

    @Bean
    public JavaMailSender mailSender() {
    	//javamailsenderImpl은 smtp가 설정 되지 않아 밑에 같은 예시 형식으로 서버설정을 추가로 해야됨
    	JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com"); // SMTP 서버 호스트
        mailSender.setPort(587); // SMTP 포트 (Gmail 기준)
//        mailSender.setUsername("dudals9187@gmail.com"); // 보내는 이메일
        mailSender.setUsername("ecjung97@gmail.com");
//        mailSender.setPassword("hvmx qdmi gnol sadw");// 구글에서 생성한 앱 비밀번호 입력
        mailSender.setPassword("xown usyc gjzv yuxf");

        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.smtp.starttls.enable", "true");  // TLS 사용
        properties.put("mail.smtp.auth", "true");  // 인증 사용
        properties.put("mail.smtp.starttls.required", "true");  // TLS 필수

        return mailSender;
    }
}