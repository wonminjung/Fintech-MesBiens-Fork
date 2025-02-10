package mesbiens.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	 @Autowired
	    private JavaMailSender mailSender;  // 이메일 발송을 위한 JavaMailSender

	    // 이메일 인증 코드 전송 메서드
	    public void sendVerificationCode(String email, String verificationCode) {
	        try {
	            // 이메일 본문 내용 구성
	            String subject = "이메일 인증 코드";
	            String text = "안녕하세요! 아래 인증 코드를 입력하여 이메일 인증을 완료해 주세요.\n\n" +
                        "인증 코드: " + verificationCode + "\n\n" +
                        "감사합니다.";

	            // 메일 발송 설정
	            SimpleMailMessage message = new SimpleMailMessage();
	            message.setTo(email);
	            message.setSubject(subject);
	            message.setText(text);
	            message.setFrom("dudals9187@gmail.com");  // 발신자 이메일

	            // 메일 전송
	            mailSender.send(message);
	        } catch (Exception e) {
	            throw new RuntimeException("이메일 전송 실패: " + e.getMessage());
	        }
	    }
	}