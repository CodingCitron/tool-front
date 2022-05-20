import axios from './index'

function registerUser(userData) {
    return axios.post('/accounts/signup', userData)
}

export { registerUser }
