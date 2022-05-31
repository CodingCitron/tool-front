<template>
  <footer id="footer">
      <div class="p-2">
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
export default {
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
    max-width: 1920px;
    width: 100%;
    height: 100%;
}
</style>