<template>
  <aside id="sidebar" class="">
        <ul class="nav">
            <li>
                <button type="button" @click="$emit('addSentence')" class="p-2 text-secondary">교정 문장 관리</button>
            </li>
            <li>
                <button type="button" class="p-2 text-secondary">작업자 관리</button>
            </li>
        </ul>
  </aside>
</template>

<script>
export default {
    setup(){

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
    font-size: 16px;
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