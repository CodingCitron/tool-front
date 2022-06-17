<template>
    <form>
        <div class="mb-3">
            <label for="name" class="form-label">이름</label>
            <input type="text" class="form-control" id="name" v-model="name">
        </div>
        <div class="mb-3">
            <label for="tel" class="form-label">전화번호</label>
            <input type="password" autocomplete="off" class="form-control" id="password" v-model="password">
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="checked">
            <label class="form-check-label" for="exampleCheck1">이름, 전화번호 기억</label>
        </div>
        <div class="d-grid gap-2 mb-3">
            <button type="submit" class="btn btn-primary" @click.prevent="onSubmit">로그인</button>
            <router-link :to="{ name: 'signUp' }" class="btn btn-primary">회원가입</router-link>
        </div>
        <div class="mb-3 hidden">
            <p class="text-danger">{{ message }}</p>
        </div>
    </form>
    <Modal :contents="message" :isOpen="isOpen" close="확인" closeStyle="btn btn-danger" @close="modalClose">
        <div>
            <p class="text-danger">{{ message }}</p>
        </div>
    </Modal>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { signIn } from '../../api/user.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useCookies } from 'vue3-cookies';
import Modal from '@/components/common/Modal'

export default {
    components: {
        Modal
    },

    setup(){
        const name = ref(''),
        password = ref(''),
        message = ref(''),
        checked = ref(''),
        isOpen = ref(false)

        const { cookies } = useCookies()
        
        const router = useRouter()
        const store = useStore()

        const onSubmit = () => {
            const userData = {
                name: name.value,
                password: password.value,
            }

            if(!checkBlank(userData)){
                message.value = '이름, 전화번호를 입력해 주세요.'
                isOpen.value = true
                return
            }

            const res = signIn(userData)
            res.then(result => {
                if(checked.value) cookies.set('remember', btoa(encodeURIComponent(name.value + '|' + password.value)))

                store.dispatch('user/LOGIN', result.data)
                router.push({ name: 'main' })
            }).catch(error => {
                console.log(error)
                message.value = error.response.data.result
                isOpen.value = true
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

        watch(checked, () => {
            if(checked.value) cookies.set('remember', btoa(encodeURIComponent(name.value + '|' + password.value)))
            else cookies.remove('remember')
        })

        onMounted(() => {
            let myNamePwd = cookies.get('remember')
    
            if(myNamePwd){
                myNamePwd = decodeURIComponent(atob(myNamePwd))
                name.value = myNamePwd.split('|')[0]
                password.value = myNamePwd.split('|')[1]
                checked.value = true
            }
        })

        const modalClose = () => {
            isOpen.value = false
        }

        return {
            name,
            password,
            message,
            onSubmit,
            checked,
            isOpen,
            modalClose
        }
    },

}
</script>

<style scoped>
form{
    width: 100%;
}
</style>