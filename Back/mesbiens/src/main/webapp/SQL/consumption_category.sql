select * from consumption_category;

insert into consumption_category values (CONSUMPTIONCATEGORY_NO_SEQ.nextval, '식사', '/images/categoryicons/food.svg');
insert into consumption_category values (CONSUMPTIONCATEGORY_NO_SEQ.nextval, '문화', '/images/categoryicons/entertainment.svg');
insert into consumption_category values (CONSUMPTIONCATEGORY_NO_SEQ.nextval, '선물', '/images/categoryicons/gift.svg');
insert into consumption_category values (CONSUMPTIONCATEGORY_NO_SEQ.nextval, '급여', '/images/categoryicons/income.svg');
insert into consumption_category values (CONSUMPTIONCATEGORY_NO_SEQ.nextval, '쇼핑', '/images/categoryicons/shopping.svg');
insert into consumption_category values (CONSUMPTIONCATEGORY_NO_SEQ.nextval, '기타', '/images/categoryicons/other.svg');
insert into consumption_category values (CONSUMPTIONCATEGORY_NO_SEQ.nextval, '입금', '/images/categoryicons/other.svg');
insert into consumption_category values (CONSUMPTIONCATEGORY_NO_SEQ.nextval, '출금', '/images/categoryicons/other.svg');

delete from consumption_category where consumption_cate_no in (7, 8);

commit;