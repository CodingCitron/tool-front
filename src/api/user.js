import instance from './index'

function signUp(userData) {
    return instance.post('/accounts/signup', userData)
}

function signIn(userData) {
    return instance.post('/accounts/signin', userData)
}

function requestToken(info){
    // console.log('토큰 재발급')
    return instance.post('/accounts/token', info)
}

function checkId(id){
    return instance.post('/accounts/check-id', id)
}

function checkLogin(userData){
    return instance.post('/accounts/check-login', userData)
}

function getUserInfo(id){
    return instance.post('/accounts/user', id)
}

function updateUserInfo(userData){
    return instance.post('/accounts/update-user', userData)
}


export { signUp, signIn, requestToken, checkId, checkLogin, getUserInfo, updateUserInfo }
