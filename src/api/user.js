import axios from 'axios'
import instance from './index'

function signUp(userData) {
    return instance.post('/accounts/sign-up', userData)
}

function signIn(userData) {
    return instance.post('/accounts/sign-in', userData)
}

function requestToken(info){
    // console.log('토큰 재발급')
    return instance.post('/accounts/request-token', info)
}

function checkId(id){
    return instance.post('/accounts/check-id', id)
}

function checkLogin(userData){
    return instance.post('/accounts/check-login', userData)
}

function getUserInfo(){
    return instance.post('/accounts/user-info')
}

function updateUserInfo(userData){
    return instance.post('/accounts/update-user', userData)
}

// { m_code_gb: 'COM002' }
function getCode(code){
    console.log(process.env)
    return axios.post(`${process.env.VUE_APP_CROWOKRS_BASE_URL}code2List.do`, code)
}

// 나의 작업
function getMyworks(option){
    return instance.post('/accounts/get-works', option)
}

export { signUp, signIn, requestToken, checkId, checkLogin, getUserInfo, updateUserInfo, getCode, getMyworks }
