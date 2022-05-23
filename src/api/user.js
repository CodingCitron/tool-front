import axios from './index'

function signUp(userData) {
    return axios.post('/accounts/signup', userData)
}

function signIn(userData) {
    return axios.post('/accounts/signin', userData)
}

export { signUp, signIn }
