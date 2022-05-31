<template>
  <AppHeader/>
  <main>
    <router-view />
  </main>
  <AppFooter/>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader'
import AppFooter from '@/components/layout/AppFooter'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },

  created() {
    const store = useStore(),
    router = useRouter(),
    user = localStorage.getItem('user')
    
    if(user){
      const userData = JSON.parse(user)
      store.commit('user/SET_USER_DATA', userData)
      store.dispatch('user/CHECK_LOGIN')
    }
  },
}
</script>

<style>
</style>
