<template>
    <form>
        <div class="mb-3">
            <label for="name" class="form-label">이름</label>
            <input type="text" class="form-control" id="name" v-model="name">
        </div>
        <div class="mb-3">
            <label for="tel" class="form-label">전화번호</label>
            <input type="text" class="form-control" id="tel" v-model="tel">
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">기억하기</label>
        </div>
        <div class="d-grid gap-2 mb-3">
            <button type="submit" class="btn btn-primary" @click.prevent="onSubmit">로그인</button>
            <router-link :to="{ name: 'signup' }" class="btn btn-primary">회원가입</router-link>
        </div>
        <div class="mb-3">
            <p class="text-danger">{{ message }}</p>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue'
import { signIn } from '../../api/user.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
    setup(){
        const name = ref(''),
        tel = ref(''),
        message = ref('')

        const router = useRouter()
        const store = useStore()

        const onSubmit = () => {
            const userData = {
                name: name.value,
                tel: tel.value,
            }

            if(!checkBlank(userData)){
                return alert("이름, 전화번호를 입력해 주세요.")
            }

            const res = signIn(userData)

            res.then(result => {
                store.commit('LOGIN', result.data)
                router.push({ name: 'main' })
            }).catch(error => {
                message.value = error.response.data.result
            })
        }

        const checkBlank = obj => {
            for(var property in obj){
                if(obj[property].trim() === ''){
                    return false
                }
            }

            return true
        }

        return {
            name,
            tel,
            message,
            onSubmit
        }
    }
}
</script>

<style scoped>
form{
    width: 100%;
}
</style>