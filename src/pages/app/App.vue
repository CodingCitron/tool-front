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

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
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
