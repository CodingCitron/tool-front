import { useRouter } from 'vue-router'
import axios from 'axios'

export const user = {
    state: { 
        userId: '', 
        userName: '', 
        userAuth: '',
        accessToken: '',
        refreshToken: '',
        isLogin: false
    },
    mutations: { 
        LOGIN (state, payload) {
            state.userId = payload.userId
            state.userName = payload.userName
            state.userAuth = payload.userAuth
            state.accessToken = payload.accessToken
            state.refreshToken = payload.refreshToken
            state.isLogin = true
            
            localStorage.setItem('user', JSON.stringify(state))
        }, 
        SET_USER_DATA (state, userData){
            state.userId = userData.userId
            state.userName = userData.userName
            state.userAuth = userData.userAuth
            state.accessToken = userData.accessToken
            state.refreshToken = userData.refreshToken
            state.isLogin = true

            axios.defaults.headers.common['Authorization'] = `${userData.accessToken}`
        },
        LOGOUT (state) {
            localStorage.removeItem('user')
            axios.defaults.headers.common['Authorization'] = null 

            state.userId = ''
            state.userName = ''
            state.userAuth = ''
            state.accessToken = ''
            state.refreshToken = ''
            state.isLogin = false
        }
    } 
} 