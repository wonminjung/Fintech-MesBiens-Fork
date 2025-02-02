ALTER TABLE POST MODIFY COLUMN MEMBER_NO BIGINT;

select * from post;

SELECT post_no_seq.NEXTVAL FROM dual;

select * from member;

SELECT post_file_path, post_file_name FROM post WHERE post_no = 65;