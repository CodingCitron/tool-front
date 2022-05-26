import { mapGetters } from 'vuex'

export const authComputed = {
    ...mapGetters({
        isLogin: 'user/IS_LOGIN'
    })
}