
select * from transaction_Detail;

select * from all_constraints where constraint_name='SYS_C0026898';


-- 소비 유형에 따른 거래장소를 동적으로 설정하는 더미 거래 내역 생성 스크립트
DECLARE
  v_date                 DATE;           -- 기준일 (하루 단위)
  v_num_transactions     INTEGER;        -- 해당 일자의 거래 건수 (1~10)
  v_tx_date              DATE;           -- 거래일시 (날짜 + 랜덤 시간)
  v_trns_balance         NUMBER;         -- 거래 금액
  v_consumption_cate_no  NUMBER;         -- 소비 유형 카테고리 번호 (1~6)
  v_trns_memo            VARCHAR2(50);   -- 거래 메모
  v_trns_place           VARCHAR2(50);   -- 거래 장소 (소비 유형에 따라 다름)
  v_random_choice        NUMBER;         -- 홍길동이 보내는지(출금) 받는지(입금) 결정
  v_hong_account         NUMBER;         -- 홍길동의 계좌 (예: 132,133,134,135 중 하나)
  v_counter_account      NUMBER;         -- 상대방 계좌 (예: 93,96,100,105,108 중 하나)
BEGIN
  -- 오늘 기준 1달 전부터 1달 후까지 (총 61일)에 대해 반복
  FOR i IN 0 .. 60 LOOP
    v_date := TRUNC(SYSDATE) - 30 + i;
    -- 하루 거래 건수 : 1 ~ 10건
    v_num_transactions := TRUNC(DBMS_RANDOM.VALUE(1, 11));
    
    FOR j IN 1 .. v_num_transactions LOOP
      --------------------------------------------------------------------
      -- 1. 거래일시 : 해당 날짜에 0~1일(즉, 하루 내 임의의 시간)을 더함
      v_tx_date := v_date + DBMS_RANDOM.VALUE(0, 1);
      
      -- 2. 거래 금액 : 10,000원 ~ 5,000,000원 사이 (정수)
      v_trns_balance := TRUNC(DBMS_RANDOM.VALUE(10000, 5000001));
      
      -- 3. 소비 유형(카테고리번호) 선택 : 1 ~ 6 사이 무작위 선택
      v_consumption_cate_no := TRUNC(DBMS_RANDOM.VALUE(1, 7));
      
      -- 4. 거래 메모 결정 (소비 유형에 따른 미리 정해진 리스트에서 무작위 선택)
      IF v_consumption_cate_no = 1 THEN
         -- 식사: [저녁 식사, 점심 식사, 커피 구매, 음료 구매]
         CASE TRUNC(DBMS_RANDOM.VALUE(1,5))
           WHEN 1 THEN v_trns_memo := '저녁 식사';
           WHEN 2 THEN v_trns_memo := '점심 식사';
           WHEN 3 THEN v_trns_memo := '커피 구매';
           WHEN 4 THEN v_trns_memo := '음료 구매';
         END CASE;
      ELSIF v_consumption_cate_no = 2 THEN
         -- 문화/여가: [영화 관람]
         v_trns_memo := '영화 관람';
      ELSIF v_consumption_cate_no = 3 THEN
         -- 선물: [생일 선물, 크리스마스 선물, 선물 구매, 크리스마스 카드]
         CASE TRUNC(DBMS_RANDOM.VALUE(1,5))
           WHEN 1 THEN v_trns_memo := '생일 선물';
           WHEN 2 THEN v_trns_memo := '크리스마스 선물';
           WHEN 3 THEN v_trns_memo := '선물 구매';
           WHEN 4 THEN v_trns_memo := '크리스마스 카드';
         END CASE;
      ELSIF v_consumption_cate_no = 4 THEN
         -- 급여: [월급, 연말 보너스, 프로젝트 급여, 추가 수입]
         CASE TRUNC(DBMS_RANDOM.VALUE(1,5))
           WHEN 1 THEN v_trns_memo := '월급';
           WHEN 2 THEN v_trns_memo := '연말 보너스';
           WHEN 3 THEN v_trns_memo := '프로젝트 급여';
           WHEN 4 THEN v_trns_memo := '추가 수입';
         END CASE;
      ELSIF v_consumption_cate_no = 5 THEN
         -- 쇼핑: [세탁비, 온라인 쇼핑, 책 구매, 헬스장 등록]
         CASE TRUNC(DBMS_RANDOM.VALUE(1,5))
           WHEN 1 THEN v_trns_memo := '세탁비';
           WHEN 2 THEN v_trns_memo := '온라인 쇼핑';
           WHEN 3 THEN v_trns_memo := '책 구매';
           WHEN 4 THEN v_trns_memo := '헬스장 등록';
         END CASE;
      ELSE
         -- 기타
         v_trns_memo := '기타 거래';
      END IF;
      
      --------------------------------------------------------------------
      -- 5. 거래장소를 소비 유형 및 거래 메모에 따라 설정
      IF v_consumption_cate_no = 1 THEN
         -- 식사의 경우: 식사메모가 "저녁 식사" 또는 "점심 식사"면 음식점, 
         -- "커피 구매", "음료 구매"면 카페로 지정
         IF v_trns_memo IN ('저녁 식사','점심 식사') THEN
            v_trns_place := '음식점';
         ELSIF v_trns_memo IN ('커피 구매','음료 구매') THEN
            v_trns_place := '카페';
         ELSE
            v_trns_place := '음식점';
         END IF;
      ELSIF v_consumption_cate_no = 2 THEN
         -- 문화/여가: 영화 관람 → 영화관
         v_trns_place := '영화관';
      ELSIF v_consumption_cate_no = 3 THEN
         -- 선물: 백화점, 쇼핑몰, 기프트샵 중 무작위 선택
         CASE TRUNC(DBMS_RANDOM.VALUE(1,4))
            WHEN 1 THEN v_trns_place := '백화점';
            WHEN 2 THEN v_trns_place := '쇼핑몰';
            WHEN 3 THEN v_trns_place := '기프트샵';
         END CASE;
      ELSIF v_consumption_cate_no = 4 THEN
         -- 급여: 일반적으로 회사에서 입금되므로 회사로 지정
         v_trns_place := '회사';
      ELSIF v_consumption_cate_no = 5 THEN
         -- 쇼핑: 각 거래 메모에 따라 장소를 다르게 지정
         IF v_trns_memo = '세탁비' THEN
            v_trns_place := '세탁소';
         ELSIF v_trns_memo = '온라인 쇼핑' THEN
            v_trns_place := '온라인 쇼핑몰';
         ELSIF v_trns_memo = '책 구매' THEN
            v_trns_place := '서점';
         ELSIF v_trns_memo = '헬스장 등록' THEN
            v_trns_place := '헬스장';
         ELSE
            v_trns_place := '쇼핑몰';
         END IF;
      ELSE
         v_trns_place := '기타';
      END IF;
      
      --------------------------------------------------------------------
      -- 6. 홍길동 계좌 여부 결정: 0~1 난수로 결정 (0이면 홍길동이 송금(출금), 그 외는 입금)
      v_random_choice := DBMS_RANDOM.VALUE(0,1);
      
      -- 홍길동의 계좌는 (예시) 132, 133, 134, 135 중 하나 선택
      CASE TRUNC(DBMS_RANDOM.VALUE(1,5))
         WHEN 1 THEN v_hong_account := 132;
         WHEN 2 THEN v_hong_account := 133;
         WHEN 3 THEN v_hong_account := 134;
         WHEN 4 THEN v_hong_account := 135;
      END CASE;
      
      -- 상대방 계좌는 (예시) 93, 96, 100, 105, 108 중 하나 선택
      CASE TRUNC(DBMS_RANDOM.VALUE(1,16))
         WHEN 1 THEN v_counter_account := 93;
         WHEN 2 THEN v_counter_account := 96;
         WHEN 3 THEN v_counter_account := 100;
         WHEN 4 THEN v_counter_account := 105;
         WHEN 5 THEN v_counter_account := 108;
         WHEN 5 THEN v_counter_account := 109;
         WHEN 6 THEN v_counter_account := 110;
         WHEN 7 THEN v_counter_account := 111;
         WHEN 8 THEN v_counter_account := 112;
         WHEN 9 THEN v_counter_account := 113;
         WHEN 10 THEN v_counter_account := 114;
         WHEN 11 THEN v_counter_account := 115;
         WHEN 12 THEN v_counter_account := 116;
         WHEN 13 THEN v_counter_account := 117;
         WHEN 14 THEN v_counter_account := 118;
         WHEN 15 THEN v_counter_account := 119;
         ELSE v_counter_account := 120;
      END CASE;
      
      --------------------------------------------------------------------
      -- 7. 한 건의 거래에 대해 입금/출금 2건의 레코드 INSERT
      IF v_random_choice < 0.5 THEN
         -- [Case 1] 홍길동이 **송금(출금)** 하는 경우
         --     → 홍길동 계좌에서는 출금, 상대방 계좌에서는 입금
         INSERT INTO TRANSACTION_DETAIL 
           (TRANSACTION_NO, TRNS_BALANCE, TRNS_CANCEL_YN, TRNS_CREATE_AT, 
            TRNS_MEMO, TRNS_PLACE, TRNS_TYPE_NAME, TRNS_UPDATE_AT, 
            CONSUMPTION_CATE_NO, RECEIVER_ACCOUNT_NO, SENDER_ACCOUNT_NO)
         VALUES 
           (transaction_no_seq.NEXTVAL, 
            v_trns_balance, 
            'N', 
            v_tx_date, 
            v_trns_memo, 
            v_trns_place, 
            'DEPOSIT', 
            v_tx_date, 
            v_consumption_cate_no, 
            v_counter_account,    -- 상대방 계좌가 받음
            v_hong_account);      -- 홍길동 계좌에서 송금

         INSERT INTO TRANSACTION_DETAIL 
           (TRANSACTION_NO, TRNS_BALANCE, TRNS_CANCEL_YN, TRNS_CREATE_AT, 
            TRNS_MEMO, TRNS_PLACE, TRNS_TYPE_NAME, TRNS_UPDATE_AT, 
            CONSUMPTION_CATE_NO, RECEIVER_ACCOUNT_NO, SENDER_ACCOUNT_NO)
         VALUES 
           (transaction_no_seq.NEXTVAL, 
            v_trns_balance, 
            'N', 
            v_tx_date, 
            v_trns_memo, 
            v_trns_place, 
            'WITHDRAWAL', 
            v_tx_date, 
            v_consumption_cate_no, 
            v_hong_account,      -- 홍길동 계좌에서 출금
            v_counter_account);
      ELSE
         -- [Case 2] 홍길동이 **입금** 하는 경우
         --     → 홍길동 계좌에서는 입금, 상대방 계좌에서는 출금
         INSERT INTO TRANSACTION_DETAIL 
           (TRANSACTION_NO, TRNS_BALANCE, TRNS_CANCEL_YN, TRNS_CREATE_AT, 
            TRNS_MEMO, TRNS_PLACE, TRNS_TYPE_NAME, TRNS_UPDATE_AT, 
            CONSUMPTION_CATE_NO, RECEIVER_ACCOUNT_NO, SENDER_ACCOUNT_NO)
         VALUES 
           (transaction_no_seq.NEXTVAL, 
            v_trns_balance, 
            'N', 
            v_tx_date, 
            v_trns_memo, 
            v_trns_place, 
            'DEPOSIT', 
            v_tx_date, 
            v_consumPTION_CATE_NO, 
            v_hong_account,      -- 홍길동 계좌가 받음
            v_counter_account);

         INSERT INTO TRANSACTION_DETAIL 
           (TRANSACTION_NO, TRNS_BALANCE, TRNS_CANCEL_YN, TRNS_CREATE_AT, 
            TRNS_MEMO, TRNS_PLACE, TRNS_TYPE_NAME, TRNS_UPDATE_AT, 
            CONSUMPTION_CATE_NO, RECEIVER_ACCOUNT_NO, SENDER_ACCOUNT_NO)
         VALUES 
           (transaction_no_seq.NEXTVAL, 
            v_trns_balance, 
            'N', 
            v_tx_date, 
            v_trns_memo, 
            v_trns_place, 
            'WITHDRAWAL', 
            v_tx_date, 
            v_consumption_cate_no, 
            v_counter_account,    -- 상대방 계좌에서 출금
            v_hong_account);
      END IF;
      --------------------------------------------------------------------
    END LOOP;
  END LOOP;
  
  COMMIT;
END;
/
