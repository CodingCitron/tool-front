<template>
  <aside id="sidebar" class="" @click="e => $emit('tabHandler', e)">
        <ul class="nav">
            <li v-for="item in props.tab">
                <button type="button" class="p-2" :value="item.name" >{{ item.btnName }}</button>
            </li>
        </ul>
  </aside>
</template>

<script>
import { ref } from 'vue'

export default {
    props: {
        tab: Object
    },
    
    setup(props){
        return {
            props
        }
    }
}
</script>

<style scoped>
#sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: 240px;
    height: 100%;
    padding: 55px 0 80px;
    border-right: 1px solid #ced4da;
    font-size: 14px;
    color: white;
}

.nav li,
.nav li button{
    width: 100%;
    
}

.nav li button{
    border: none;
    background: transparent;
}

.nav li button:hover{
    
}
</style>