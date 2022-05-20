<template>
    <form>
        <div class="mb-3">
            <label for="name" class="form-label">이름</label>
            <input type="text" class="form-control" id="name" >
        </div>
        <div class="mb-3">
            <label for="tel" class="form-label">전화번호</label>
            <input type="text" class="form-control" id="tel">
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">기억하기</label>
        </div>
        <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary">로그인</button>
            <router-link to="/authoringtool/22/signup" class="btn btn-primary">회원가입</router-link>
        </div>
    </form>
</template>

<script>
export default {
    
}
</script>

<style scoped>
form{
    width: 100%;
}
</style>