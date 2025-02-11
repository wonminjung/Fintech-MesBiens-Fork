
select * from member;

insert into member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn)
values (member_no_seq.nextval, '서울', '2025-01-01', 'T1@gmail.com', 'hong', '홍길동', 'test', '010-1234-1234', sysdate, 'N');

-- 'test' 문자열을 암호화한 값을 패스워드가 'test' 인 레코드 전부 업데이트
update member set member_password='$2a$10$BLKx0ctm4.IfQEdgGrKt1e4fyesu1XBha4MTvw7K5sFFbceW8ZsN6' where member_password = 'test';

insert into member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn)
values (member_no_seq.nextval, '서울', '2025-01-01', 'T2@gmail.com', 'seta', '세탁소', 'test', '010-1234-1234', sysdate, 'N');

insert into member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn)
values (member_no_seq.nextval, '서울', '2025-01-01', 'T3@gmail.com', 'ki1mchul', '김철수', 'test', '010-1234-1234', sysdate, 'N');

insert into member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn)
values (member_no_seq.nextval, '서울', '2025-01-01', 'T4@gmail.com', 'jung', '정우성', 'test', '010-1234-1234', sysdate, 'N');

insert into member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn)
values (member_no_seq.nextval, '서울', '2025-01-01', 'T5@gmail.com', 'abc', '(주)ABC', 'test', '010-1234-1234', sysdate, 'N');

insert into member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn)
values (member_no_seq.nextval, '서울', '2025-01-01', 'T3@gmail.com', 'star', '스타벅스', 'test', '010-1234-1234', sysdate, 'N');

insert into member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn)
values (member_no_seq.nextval, '서울', '2025-01-01', 'T7@gmail.com', '영원희', '김영희', 'test', '010-1234-1234', sysdate, 'N');

insert into member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn)
values (member_no_seq.nextval, '서울', '2025-01-01', 'T8@gmail.com', 'xyz', '(주)xyz', 'test', '010-1234-1234', sysdate, 'N');

insert into member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn)
values (member_no_seq.nextval, '미국', '2025-01-01', 'doji@gmail.com', '화성', '일론머스크', 'test', '010-1234-1234', sysdate, 'N');

insert into member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn)
values (member_no_seq.nextval, '서울', '2025-01-01', 'T9@gmail.com', '정다정다감', '정다은', 'test', '010-1234-1234', sysdate, 'N');

insert into member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn)
values (member_no_seq.nextval, '서울', '2025-01-01', 'T10@gmail.com', '그제훈', '이제훈', 'test', '010-1234-1234', sysdate, 'N');

insert into member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn)
values (member_no_seq.nextval, '서울', '2025-01-01', 'T11@gmail.com', '박지민', '박지민', 'test', '010-1234-1234', sysdate, 'N');

insert into member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn)
values (member_no_seq.nextval, '서울', '2025-01-01', 'T12@gmail.com', 'def', 'def', 'test', '010-1234-1234', sysdate, 'N');

insert into member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn)
values (member_no_seq.nextval, '서울', '2025-01-01', 'T13@gmail.com', '지금 이순신 마법처럼', '이순신', 'test', '010-1234-1234', sysdate, 'N');

insert into member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn)
values (member_no_seq.nextval, '서울', '2025-01-01', 'CGV@gmail.com', 'CGV', '(주)cgv', 'test', '010-1234-1234', sysdate, 'N');





INSERT INTO member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn) 
VALUES (member_no_seq.NEXTVAL, '서울', '1995-07-12', 'minsu123@gmail.com', 'minsu123', '김민수', 'password123', '010-1234-5678', SYSDATE - 50, 'N');

INSERT INTO member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn)
VALUES (member_no_seq.NEXTVAL, '부산', '1992-03-25', 'seoyoon87@gmail.com', 'seoyoon87', '이서윤', 'securepass', '010-2345-6789', SYSDATE - 200, 'N');

INSERT INTO member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn) 
VALUES (member_no_seq.NEXTVAL, '대구', '1998-11-08', 'jihoon93@naver.com', 'jihoon93', '박지훈', 'pass9876', '010-3456-7890', SYSDATE - 150, 'N');

INSERT INTO member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn) 
VALUES (member_no_seq.NEXTVAL, '인천', '2001-05-30', 'yerin2023@daum.net', 'yerin2023', '정예린', 'mypassword', '010-4567-8901', SYSDATE - 365, 'N');

INSERT INTO member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn) 
VALUES (member_no_seq.NEXTVAL, '광주', '1990-09-17', 'donghyun77@gmail.com', 'donghyun77', '최동현', 'secure777', '010-5678-9012', SYSDATE - 180, 'N');

INSERT INTO member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn) 
VALUES (member_no_seq.NEXTVAL, '울산', '1988-06-21', 'financeplus@corp.com', 'financeplus', 'Finance Plus', 'financepass', '02-3456-1234', SYSDATE - 500, 'N');

INSERT INTO member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn) 
VALUES (member_no_seq.NEXTVAL, '제주', '1985-02-10', 'nextsoft@company.com', 'nextsoft', 'NextSoft Inc.', 'nextpass', '051-7890-5678', SYSDATE - 700, 'N');

INSERT INTO member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn) 
VALUES (member_no_seq.NEXTVAL, '대전', '1993-08-14', 'globaltrade@biz.net', 'globaltrade', 'Global Trade Co.', 'gtpass2024', '042-4567-8912', SYSDATE - 800, 'N');

INSERT INTO member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn) 
VALUES (member_no_seq.NEXTVAL, '서울', '2002-07-17', 'limjihun@outlook.com', 'limjihun', '임지훈', 'secureme', '010-7777-8888', SYSDATE - 40, 'N');

INSERT INTO member (member_no, member_address, member_birth, member_email, member_id, member_name, member_password, member_phone, member_create_at, member_sns_sign_up_yn) 
VALUES (member_no_seq.NEXTVAL, '부산', '1994-05-22', 'jiyoon23@kakao.com', 'jiyoon23', '한지윤', 'mypwd2023', '010-1111-2222', SYSDATE - 60, 'N');


commit;