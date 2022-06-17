import instance from './index'

function allUserCount(){
    return instance.post('/manage/count-user')
}

function userData(page){
    return instance.post('/manage/userData', page)
}

function errExcel(data){
    return instance.post('/manage/err-excel', data)
}

function addCorSentece(text){
    return instance.post('/manage/addSentence', text)
}

function getSentence(type){
    return instance.post('/manage/getSentence', type)
}

function getSentenceCount(type){
    return instance.post('/manage/getSentenceCount', type)
}

function corExcel(data){
    return instance.post('/manage/cor-excel', data)
}

function getUserData(limit){
    return instance.post('/manage/get-user-data', limit)
}

export { allUserCount, userData, errExcel, addCorSentece, getSentence, getSentenceCount, corExcel, getUserData }