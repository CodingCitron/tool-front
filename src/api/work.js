import instance from './index'

function scrape(inputData) {
    return instance.post('/works/scrape', inputData)
}

function inputCsv(inputData) {
    console.log(inputData)
    return instance.post('/works/csv', inputData)
}

function getExpertSentence(userInfo){
    return instance.post(`/works/expert-sentence`, userInfo)
}

function inputErrorSentence(inputData){
    return instance.post(`/works/error-sentence`, inputData)
}

export { scrape, inputCsv, getExpertSentence, inputErrorSentence }

/*
	id INTEGER not null AUTO_INCREMENT,
	sentence varchar(512) not null,
	origin_id VARCHAR(64) not null,
	worker varchar(64) not null,
	registrant varchar(64), 
	status varchar(10),
	reg_date DATETIME default sys_datetime,
	error_type_spac int(2),
	error_type_mark int(2),
	error_type_etc int(2),
	meta_category varchar(32),
	meta_interface varchar(16),
	meta_keyboard varchar(16),
	meta_gender varchar(10),
	meta_age varchar(10),
*/