<template>
  <header id="header" :class="[wide? 'fixed-top bg-light': '']" class="shadow-sm">
        <nav :class="[wide? 'container-fluid' :'container']">
            <h1 title="고빈도 오류 교정 데이터"><router-link :to="{ name: 'main' }">22번 저작도구</router-link></h1>
            <div class="right-menu">
                <DropDownMenu v-if="isLogin"/>
            </div>
        </nav>
  </header>
</template>

<script>
import { authComputed } from '@/pages/app/store/helper'
import { computed } from '@vue/runtime-core'
import DropDownMenu from '@/components/common/DropDownMenu'

export default {
    components: {
        DropDownMenu
    },

    props: {
        wide: Boolean
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
    min-height: 55px;
    border-bottom: 1px solid #ced4da;
}

header > nav{
    display: flex;
    justify-content: space-between;
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

a:hover{
    color: #212529;
}

.right-menu button{
    font-size: 16px;
}
</style>