
-- 유저
select * from member;
insert into member values(member_no_seq.nextval, '단성사 빌딩 4층', '2025-01-15', sysdate, 'test@gmail.com', 'test', '테스트 사용자', 'test', '010-1234-1234', '', 'N');

-- 제약 조건 확인
select constraint_name, constraint_type, table_name from all_constraints where table_name = 'ACCOUNT';

select * from account;

insert into account values(account_no_seq.nextval, 200000000, '732768429712', sysdate, '1234', 'B001', 2);
insert into account values(account_no_seq.nextval, 16820493, '842391069283', sysdate, '1234', 'B002', 2);
insert into account values(account_no_seq.nextval, 300, '123456789', sysdate, '1234', 'B003', 2);
insert into account values(account_no_seq.nextval, 32005690, '72068375610', sysdate, '1234', 'B004', 2);
insert into account values(account_no_seq.nextval, 8301692720, '17396838267', sysdate, '1234', 'B005', 2);
insert into account values(account_no_seq.nextval, 898990, '662473856734', sysdate, '1234', 'B005', 2);
insert into account values(account_no_seq.nextval, 300, '123456789', sysdate, '1234', 'B003', 2);

commit;