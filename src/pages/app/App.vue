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
import { useStore } from "vuex"

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },

  created() {
    const store = useStore()
    const router = useRouter()
    const user = localStorage.getItem('user')
    
    if(user){
      const userData = JSON.parse(user)
      store.commit('SET_USER_DATA', userData)
      //router.push({ name: 'main' })
    }else{
      router.push({ name: 'signin' })
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@400;600;700&display=swap');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  font-family: 'Gothic A1', sans-serif;
  font-size: 14px;
}

main{
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 140px);
}
</style>
