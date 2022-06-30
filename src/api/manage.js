import instance from './index'

// 문장관리 탭
//authoring/22
function postMegaExcel(data){
    return instance.post('/manage/post-mega-excel', data)
}

function postExpertExcel(text){
    return instance.post('/manage/post-expert-excel', text)
}

function getSentence(type){
    return instance.post('/manage/get-sentence', type)
}

function postExpertSentence(data){
    return instance.post('/manage/post-expert-sentence', data)
}
// 문장관리 탭

// 작업자 탭
function getUserData(limit){
    return instance.post('/manage/get-user-data', limit)
}
// 작업자 탭

export { postMegaExcel, postExpertExcel, getSentence, postExpertSentence, getUserData }

