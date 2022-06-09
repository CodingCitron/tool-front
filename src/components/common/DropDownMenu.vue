<template>
  <div class="dropdown d-flex">
        <button class="user-button" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            {{ userInfo.userName + '님' }}
        </button>
        <ul class="dropdown-menu shadow-sm" aria-labelledby="dropdownMenuButton1">
            <li>
                <button class="dropdown-item" @click="logout">로그아웃</button>
            </li>
            <li>
                <button class="dropdown-item" disabled>가이드</button>
            </li>
            <li>
                <button class="dropdown-item" disabled>마이 페이지</button>
            </li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'accountDetail' }">개인정보</router-link>
            </li>
            <li v-if="authCheck()">
                <router-link class="dropdown-item" :to="{ name: 'manage' }">관리</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { authComputed } from '@/pages/app/store/helper'

export default {
    setup(){
        const store = useStore(),
        router = useRouter(),
        userInfo = store.getters['user/GET_USER_INFO']
        
        const logout = () => {
            store.dispatch('user/LOGOUT')
            router.push({ name: 'signIn' })
        }

        const authCheck = () => {
            if(userInfo){
                return userInfo.userAuth.includes('ADMIN')
            }else{
                logout()
            }

            return false
        }

        return {
            userInfo,
            logout,
            authCheck
        }
    },

    computed: {
        ...authComputed
    }
}
</script>

<style scoped>
.user-button{
    background: transparent;
    border: none;
    font-size: 14px;
}

.dropdown-menu{
    min-width: initial;
    font-size: 14px;
}
</style>