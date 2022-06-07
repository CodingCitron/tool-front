import instance from './index'

function allUserCount(){
    return instance.post('/manage/count-user')
}

function userData(page){
    return instance.post('/manage/userData', page)
}

function importExcel(excel){
    return instance.post('/manage/excel', excel)
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

export { allUserCount, userData, importExcel, addCorSentece, getSentence, getSentenceCount, corExcel }