<template>
  <header>
        <nav class="p-2">
            <h1><router-link :to="{ name: 'main' }">22번 저작도구</router-link></h1>
            <div class="right-menu">
                <button type="button" class="btn btn-primary" @click="logout" v-if="isLogin">로그아웃</button>
            </div>
        </nav>
  </header>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { authComputed } from '@/pages/app/store/helper'
import { computed } from '@vue/runtime-core'

export default {
    setup(){
        const store = useStore()
        const router = useRouter()

        const logout = () => {
            store.dispatch('user/LOGOUT')
            router.push({ name: 'signin' })
        }

        return {
            logout
        }
    },

    computed: {
        ...authComputed
    }
}
</script>

<style scoped>
header{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    border-bottom: 1px solid #ced4da;
}

header > nav{
    display: flex;
    justify-content: space-between;
    max-width: 1920px;
    width: 100%;
    height: 100%;
}

h1,
.right-menu{
    display: flex;
    align-items: center;
    margin: 0;
    font-size: 24px;
    color: #212529;
}

a{
    text-decoration: none;
    color: inherit;
}

a:hover{
    color: #212529;
}

.right-menu button{
    font-size: 16px;
}
</style>