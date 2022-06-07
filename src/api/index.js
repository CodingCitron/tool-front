import axios from 'axios'
import store from '@/pages/app/store'
import router from '@/pages/app/router'

const instance = axios.create({
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
    },
    baseURL: process.env.VUE_APP_API_URL,
})

instance.interceptors.request.use(async function(config){
    config.headers['Authorization'] = store.getters['user/GET_ACCESS_TOKEN']
        console.log(config)
        return config
    }, function (error){

    return Promise.reject(error)
})

// 응답(response) interceptor
instance.interceptors.response.use(
    function (response) {
        // 200대 response를 받아 응답 데이터를 가공하는 작업
        console.log(response)
        return response
    },
    async function (error) {
        // 200대 이외의 오류 응답을 가공
        console.log(error)
        const isLogin = store.getters['user/IS_LOGIN'],
        originalConfig = error.config

        if(isLogin) { // 로그인 상태

            if (error.response.data.message === 'AceessTokenExpiredException') { // 만료된 토큰
                console.log('AceessTokenExpiredException')
                const result = await store.dispatch('user/REQUEST_ACCESS_TOKEN') // token refresh 요청
                originalConfig.headers['Authorization'] = store.getters['user/GET_ACCESS_TOKEN']
                return instance(originalConfig) // 재요청
            } else if (error.response.data.message === 'JWTVerificationException' || error.response.data.message === 'verifyFailed') {
                console.log('JWTVerificationException || verifyFailed')
                // 토큰 에러 - 로그 아웃 || 리프레시 토큰 검증 실패
                store.dispatch('user/LOGOUT')
                router.push({ name: 'signIn' })
                return Promise.reject(error.response.data)
            } 

            return Promise.reject(error.response.data)
        }

        return Promise.reject(error)
    }
)

export default instance
// example: instance.post(url, data)
// https://joshua1988.github.io/vue-camp/advanced/folder-structure.html#%E1%84%87%E1%85%B2-cli%E1%84%85%E1%85%A9-%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB-%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB-%E1%84%91%E1%85%A9%E1%86%AF%E1%84%83%E1%85%A5-%E1%84%80%E1%85%AE%E1%84%8C%E1%85%A9

// https://yamoo9.github.io/axios/guide/api.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1
