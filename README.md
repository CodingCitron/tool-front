아이디 id
교정 문장 cor_sentence
에러 문장 error_sentence
근접 에러
조사 오류
유사 발음 오류
자음 동화 오류
띄어쓰기 오류
문장부호 오류
기타 오류
데이터 출처
오류 분류
입력 장치
입력 키보드
성별
나이
데이터 생성일

<!-- 
    create table sentence_data  (
	id INTEGER not null AUTO_INCREMENT,
	sentence varchar(512) not null,
	origin_id VARCHAR(64) not null,
	worker varchar(64),
	registrant varchar(64), /* 등록자 */
	status varchar(32),
	error_type_near varchar(32),
	error_type_post varchar(32),
	error_type_pron varchar(32),
	error_tpye_cons varchar(32),
	error_type_spac varchar(32),
	error_type_mark varchar(32),
	error_type_etc varchar(32),
	meta_source varchar(32),
	meta_category varchar(32),
	meta_interface varchar(32),
	meta_keyboard varchar(32),
	meta_gender varchar(32),
	meta_age varchar(32),
	reg_date DATETIME default sys_datetime,
	modify_date DATETIME default null,
	group_info varchar(32),
	constraint work_list_PK primary key(id, origin_id)
)
-->