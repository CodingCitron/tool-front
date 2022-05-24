import { createStore } from "vuex"
import { user } from '@/pages/app/store/modules/user'

export default createStore({
  modules: { user },
  getters:{
        isLogin (state) {
            return state.user.isLogin
        },
        // accessToken이 만료되었는지 여부를 가져옵니다.
        isTokenExpire (state) {
            let expire = false
            //https://carrotweb.tistory.com/134
        }
    },
})
 