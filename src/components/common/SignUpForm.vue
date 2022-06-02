<template>
    <form>
        <div class="mb-3" >
            <label for="name" class="form-label">이름<span class="text-danger">*</span></label>
            <input type="text" class="form-control" id="name" v-model="name" placeholder="급여 지급 통장의 이름과 동일하게 입력해 주세요.">
        </div>
        <div class="mb-3">
            <label for="tel" class="d-flex form-label justify-content-between">
              <span>전화번호<span class="text-danger">*</span></span>
              <span :class="[telMessage.status ? 'text-success' : 'text-danger' ]">{{ telMessage.message }}</span>
            </label>
            <input type="text" class="form-control" id="tel" v-model="tel" @keyup="checkIdValue" placeholder="아이디로 사용됩니다. ex)01012345678">
        </div>
         <div class="mb-3">
            <label for="birth" class="form-label">생년월일<span class="text-danger">*</span></label>
            <input type="text" class="form-control" id="birth" v-model="birth" placeholder="19900101">
        </div>
        <div class="mb-3">
            <div>
              <label class="form-label">성별<span class="text-danger">*</span></label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="gender" id="male" value="male" v-model="gender">
              <label class="form-check-label" for="male">남자</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="gender" id="female" value="female" v-model="gender">
              <label class="form-check-label" for="female">여자</label>
            </div>
        </div>
        <div class="mb-3">
            <div>
              <label class="form-label">환경<span class="text-danger">*</span></label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="device" id="pc" value="pc" v-model="device">
              <label class="form-check-label" for="pc">PC</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="device" id="mobile" value="mobile" v-model="device">
              <label class="form-check-label" for="mobile">MOBILE</label>
            </div>
        </div>
        <div class="mb-3">
            <div>
              <label class="form-label">키보드<span class="text-danger">*</span></label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="key" id="qwerty" value="qwerty" v-model="keyInterface">
              <label class="form-check-label" for="qwerty">QWERTY</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="key" id="천지인" value="천지인" v-model="keyInterface">
              <label class="form-check-label" for="천지인">천지인</label>
            </div>
        </div>
        <div class="mb-3">
            <label for="manager" class="d-flex form-label justify-content-between">
              <span>매니저</span>
              <span :class="[managerMessage.status ? 'text-success' : 'text-danger' ]">{{ managerMessage.message }}</span>
            </label>
            <input type="text" class="form-control" id="manager" @keyup="checkManagerId" v-model="manager" placeholder="매니저 전화번호 입력">
        </div>
        <div class="d-flex gap-2 button-list mb-3">
            <button type="submit" class="btn btn-primary" @click.prevent="checkForm">가입하기</button>
            <router-link class="btn btn-primary" :to="{ name: 'signIn' }">취소</router-link>
        </div>
        <div>
          <span class="text-danger">{{ error }}</span>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue'
import { signUp, checkId } from '../../api/user.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getWesternAge } from '@/util'

export default {
  setup(){
    const name = ref(''),
    tel = ref(''),
    birth = ref(''),
    gender = ref(''),
    device = ref(''),
    keyInterface = ref(''),
    manager = ref(''),
    error = ref(''),
    telMessage = ref({
      message: '',
      status: false
    }),
    managerMessage = ref({
      message: '',
      status: false
    })

    const router = useRouter()
    const store = useStore()

    const submit = () => {
      // getWesternAge(birth.value)
      const userData = {
          name: name.value,
          tel: tel.value,
          birth: birth.value,
          gender: gender.value,
          device: device.value,
          keyInterface: keyInterface.value,
          manager: manager.value,
          auth: ['WORKER']
      }

      const res = signUp(userData)

      res.then(() => {
        router.push({ name: 'signIn' })
      }).catch(err => {
        if(err.response && err.response.data.message === 'duplicateKey'){
          alert('중복된 전화번호입니다.')
        }
      })
    }

    const checkForm = e => {
      if(!name.value || !tel.value || !birth.value || !device.value || !keyInterface.value){
        error.value = '입력하지 않은 값이 있습니다.'
        return
      }
      
      if(!tel.value.match(/^[0-9]{3}[0-9]{4}[0-9]{4}$/)){
        error.value = '전화번호를 올바르게 입력해주세요.'
        return
      }

      if(!birth.value.match(/^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/)){
        error.value = '생년월일 8자리를 입력해주세요.'
        return
      }

      if(!telMessage.value.status){
        error.value = '해당 전화번호로 가입한 사용자가 있습니다.'
        return
      }

      if(manager.value !== ''){
        if(!manager.value.match(/^[0-9]{3}[0-9]{4}[0-9]{4}$/)){
          error.value = '매니저 전화번호를 올바르게 입력해주세요.'
          return
        }

        if(!managerMessage.value.status){
          error.value = '등록되지 않는 전화번호입니다.'
          return
        }
      }

      submit()
    }

    const checkIdValue = e => {

      telMessage.value = {
        message: '',
        status: false
      }

      if(!tel.value.match(/^[0-9]{3}[0-9]{4}[0-9]{4}$/)) return
      const variable = {
        tel: tel.value
      }

      const res = checkId(variable)

      res.then(result => {
        if(result.data.message == 1){
          // 중복된 전화번호
          telMessage.value = {
            message: '가입된 전화번호입니다.',
            status: false
          }
        } else { 
          telMessage.value = {
            message: '사용가능',
            status: true
          }
        }
      }).catch(error => {
        console.loe(error)
      })
    }

    const checkManagerId = e => {
      managerMessage.value = {
        message: '',
        status: false
      }

      if(!manager.value.match(/^[0-9]{3}[0-9]{4}[0-9]{4}$/)) return
      const variable = {
        tel: manager.value
      }

      const res = checkId(variable)
      res.then(result => {
        console.log(result)
        if(result.data.message == 1){
          // 중복된 전화번호
          managerMessage.value = {
            message: '',
            status: true
          }
        } else { 
          managerMessage.value = {
            message: '없는 전화번호',
            status: false
          }
        }
      }).catch(error => {
        console.loe(error)
      })
    }

    return {
      name,
      tel,
      birth,
      gender,
      device,
      keyInterface,
      manager,
      checkForm,
      error,
      checkIdValue,
      checkManagerId,
      telMessage,
      managerMessage
    }
  }
}
</script>

<style scoped>
form{
  width: 100%;
}

.button-list button,
.button-list a{
  width: 100%;
}
</style>