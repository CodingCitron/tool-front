<template>
  <AppHeader v-bind:wide="wide" />
  <main id="main" :class="[wide? 'p-0' : '']">
    <router-view />
  </main>
  <AppFooter v-bind:wide="wide" />
  <Toast />
</template>

<script>
import AppHeader from '@/components/layout/AppHeader'
import AppFooter from '@/components/layout/AppFooter'
import Toast from '@/components/common/Toast'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, watch } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import { getCode } from '@/api/user'
import { isMobile } from '@/util'


export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    Toast
  },

  setup(){
    const route = useRoute(),
    wide = ref(false)

    watch(() => route.name, () => {
        if(route.name === 'manage') {
            wide.value = true
        } else {
            wide.value = false
        }
    })

  /*
    console.log('모바일인가요? ' + isMobile())

    function getCode(){
      const res = getCode({ m_code_gb: 'COM011' })
      res.then(result => {
      }).catch(error => {
      })
    }

    getCode()
  */
 
    return {
      wide
    }
  },

  created() {
    const store = useStore(),
    router = useRouter(),
    user = localStorage.getItem('user')

    if(user){
      const userData = JSON.parse(user)
      store.commit('user/SET_USER_DATA', userData)
      store.dispatch('user/CHECK_LOGIN')
      .then(result => {
        if(!result) router.push({ name: 'signIn' })
      }).catch(error => {
        console.log(error)
      })
    }
  },
}
</script>

<style>
</style>
