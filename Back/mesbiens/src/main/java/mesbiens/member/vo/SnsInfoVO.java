package mesbiens.member.vo;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table(name = "snsinfo")  // 데이터베이스의 "snsinfo" 테이블에 매핑
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})  // Jackson 직렬화 시 불필요한 Hibernate 관련 속성 무시
@NoArgsConstructor  // 기본 생성자 자동 생성
@AllArgsConstructor  // 모든 필드를 파라미터로 받는 생성자 자동 생성
@Getter 
@Setter  
@EqualsAndHashCode(of = "snsNo")  // equals()와 hashCode() 메서드를 snsNo를 기준으로 자동 생성
public class SnsInfoVO {

    @Id  
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sns_no_seq_generator")  // 이 값은 시퀀스를 이용해 자동 증가됩니다.
    @SequenceGenerator(  //  시퀀스를 사용하여 값이 증가하도록 설정
        name = "sns_no_seq_generator",
        sequenceName = "sns_no_seq",
        initialValue = 1,
        allocationSize = 1
    )
    @Column(name = "sns_no")  
    private int snsNo;  // SNS 로그인 정보 PK

    @ManyToOne(fetch = FetchType.LAZY)  // MemberVO와 다대일 관계 설정. 여러 SNS 정보가 하나의 회원에 속할 수 있음
    @JoinColumn(name = "member_no", nullable = false)  // member_no 연결 회원번호(FK)
    private MemberVO memberNo;  // 이 SNS 정보와 연관된 회원 정보

    @Column(name = "sns_id", nullable = false, length = 255) 
    private String snsId;  // SNS 서비스 사용자 ID

    @Column(name = "sns_type", nullable = false, length = 50)  
    private String snsType;  // SNS 서비스의 타입 (구글, 카카오 등)

    @Column(name = "sns_name", length = 255)  
    private String snsName;  // SNS 로그인 사용자 이름

    @Column(name = "sns_profile", length = 500)  
    private String snsProfile;  // 사용자 프로필 이미지 URL

    @CreationTimestamp  // 이 필드는 엔티티가 생성될 때 자동으로 현재 날짜와 시간으로 설정됨
    @Column(name = "sns_connect_date", nullable = false)  
    private Timestamp snsConnectDate;  // SNS 연결 날짜

    @Column(name = "sns_code", length = 255)  
    private String snsCode;  // SNS 연동에 필요한 인증 코드 
    
 
 	
}
