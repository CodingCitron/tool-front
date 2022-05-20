<template>
    <form @submit.prevent="onSubmit">
        <div class="mb-3">
            <label for="name" class="form-label">이름</label>
            <input type="text" class="form-control" id="name" v-model="name" placeholder="급여 지급 통장의 이름과 동일하게 입력해 주세요.">
        </div>
        <div class="mb-3">
            <label for="tel" class="form-label">전화번호</label>
            <input type="text" class="form-control" id="tel" v-model="tel" placeholder="아이디로 사용됩니다.">
        </div>
         <div class="mb-3">
            <label for="birth" class="form-label">생년월일</label>
            <input type="text" class="form-control" id="birth" v-model="birth" placeholder="19900101">
        </div>
        <div class="mb-3">
            <div>
              <label class="form-label">그룹</label>
            </div>
            <select class="form-select" aria-label="Default select example" v-model="group">
              <option selected>선택 안함</option>
              <option value="ufit">유핏</option>
              <option value="megastudy">메가스터디</option>
              <option value="smsoft">세명소프트</option>
              <option value="edutech">에듀테크</option>
              <option value="saltluxIno">솔트룩스 이노베이션</option>
            </select>
        </div>
        <div class="mb-3">
            <div>
              <label class="form-label">성별</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="sex" id="male" value="male" v-model="sex">
              <label class="form-check-label" for="male">남자</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="sex" id="female" value="female" v-model="sex">
              <label class="form-check-label" for="female">여자</label>
            </div>
        </div>
        <div class="mb-3">
            <div>
              <label class="form-label">환경</label>
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
              <label class="form-label">키보드</label>
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
            <label for="recommender" class="form-label">추천인</label>
            <input type="text" class="form-control" id="recommender" v-model="recommender" placeholder="추천인 전화번호 입력">
        </div>
        <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary">가입하기</button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue'
import { registerUser } from '../../api/user.js'

export default {
  setup(){
    const name = ref(''),
    tel = ref(''),
    birth = ref(''),
    sex = ref(''),
    device = ref(''),
    keyInterface = ref(''),
    group = ref('선택 안함'),
    recommender = ref('')

    const onSubmit = async () => {
        const userData = {
            name: name.value,
            tel: tel.value,
            birth: birth.value,
            sex: sex.value,
            device: device.value,
            keyInterface: keyInterface.value,
            group: group.value,
            recommender: recommender.value
        }
        console.log(userData)

        const data = await registerUser(userData)
        console.log(data)
        initForm()
    }

    const initForm = () => {
      name.value = ''
      tel.value = ''
      birth.value = ''
      sex.value = ''
      device.value = ''
      keyInterface.value = ''
    }

    return {
      name,
      tel,
      birth,
      sex,
      device,
      keyInterface,
      group,
      recommender,
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