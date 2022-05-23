<template>
    <div class="container">
        <h2 class="mb-3">로그인</h2>
        <SignInForm />
    </div>
</template>

<script>
import SignInForm from '@/components/common/SignInForm'

export default {
    components: {
        SignInForm,
    },
}
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 600px;
    height: 100vh;
}

h2{
    width: 100%;
}
</style>
