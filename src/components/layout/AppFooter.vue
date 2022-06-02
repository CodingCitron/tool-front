<template>
  <footer id="footer">
      <div :class="[wide? 'container-fluid bg-light' :'container']">
          <div></div>
          <div>
              <router-link :to="{ name: 'main' }">
                  <img :src="logo" alt="logo" id="logo-img">
              </router-link>
          </div>
      </div>
  </footer>
</template>

<script>
import { computed, watch } from '@vue/runtime-core'

export default {
    props: {
        wide: Boolean
    },

    setup() {
        return {
            logo: require('../../assets/img/logo_black.jpg')
        }
    }
}
</script>

<style>
#footer{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    border-top: 1px solid #ced4da;
}

#footer > div{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
}
</style>