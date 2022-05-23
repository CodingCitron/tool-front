import { createStore } from "vuex"
import { user } from '@/pages/app/store/modules/user'

export default createStore({
  modules: { user },
  getters:{
        isLogin (state) {
            return state.user.isLogin
        }
    },
})
 