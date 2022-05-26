import { requestToken } from '@/api/user'
import { availableToken } from '@/util'

export const user = {
    namespaced: true,
    state: { 
        userId: '', 
        userName: '', 
        userAuth: '',
        accessToken: '',
        refreshToken: '',
        isLogin: false
    },
    getters:{
        IS_LOGIN: state => state.isLogin, // https://carrotweb.tistory.com/134
        GET_ACCESS_TOKEN: state => state.accessToken,
        GET_REFRESH_TOKEN: state => state.refreshToken,
        GET_USER_INFO: state => {
            return {
                userId: state.userId,
                userName: state.userName,
                userAuth: state.userAuth
            }
        }
    },
    mutations: { 
        LOGOUT (state) {
            localStorage.removeItem('user')

            state.userId = ''
            state.userName = ''
            state.userAuth = ''
            state.accessToken = ''
            state.refreshToken = ''
            state.isLogin = false
        },
        SET_USER_DATA (state, userData){
            state.userId = userData.userId
            state.userName = userData.userName
            state.userAuth = userData.userAuth
            state.accessToken = userData.accessToken
            state.refreshToken = userData.refreshToken
            state.isLogin = true

            localStorage.setItem('user', JSON.stringify(state))
        },
        SET_ACCESS_TOKEN (state, token){
            state.accessToken = token
            localStorage.setItem('user', JSON.stringify(state))
        }
    },
    actions: {
        CHECK_LOGIN ({ commit, state }) { // 사용하지 마시오.
            if(!availableToken(state.refreshToken)) {
                this.commit('user/LOGOUT')
                return false
            } else {
                return true
            }
        },
        LOGIN (context, payload) {
            this.commit('user/SET_USER_DATA', payload)
        },
        LOGOUT (context, page){
            this.commit('user/LOGOUT')
        },
        async REQUEST_ACCESS_TOKEN ({ commit, state }, payload) {
            let result = false
            const info = {
                userName: state.userName,
                userId: state.userId,
                userAuth: state.userAuth,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken
            }

            const res = await requestToken(info)
            if(res.status === 200){
                this.commit('user/SET_ACCESS_TOKEN', res.data.accessToken)
                result = true
                return result
            }else{
                return result
            }
        }
    }
} 