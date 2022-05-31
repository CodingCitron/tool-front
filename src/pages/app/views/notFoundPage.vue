<template>
    <div class="not-found p-4 shadow">
        <div>
            <p>404</p>
            <p>페이지를 찾을 수 없습니다.</p>
            <router-link class="text-primary" :to="{ name: 'main' }">메인 페이지로 이동</router-link>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.not-found{
    font-size: 24px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
}

.not-found a{
    font-size: 16px;
}
</style>