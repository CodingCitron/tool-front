<template>
    <div class="container">
        <h2 class="mb-3">회원가입</h2>
        <SignUpForm />
    </div>
</template>

<script>
import SignUpForm from '@/components/common/SignUpForm'

export default {
    components: {
        SignUpForm,
    },
}
</script>

<style scoped>
.container{
    max-width: 600px;
}

h2{
    width: 100%;
}
</style>
