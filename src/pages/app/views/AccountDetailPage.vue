<template>
    <div class="container">
        <h2>개인정보</h2>
        <form>
            <div class="mb-3" >
                <label for="name" class="form-label">이름<span class="text-danger"></span></label>
                <input type="text" class="form-control" id="name" readonly v-model="userData.name" placeholder="급여 지급 통장의 이름과 동일하게 입력해 주세요.">
            </div>
            <div class="mb-3">
                <label for="tel" class="d-flex form-label justify-content-between">
                <span>전화번호</span>
                </label>
                <input type="text" class="form-control" id="tel" readonly v-model="userData.tel" >
            </div>
            <div class="mb-3">
                <label for="birth" class="form-label">생년월일</label>
                <input type="text" class="form-control" id="birth" readonly v-model="userData.birth" placeholder="19900101">
            </div>
            <div class="mb-3">
                <div>
                <label class="form-label">성별</label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="gender" id="male" value="male" disabled v-model="userData.gender">
                <label class="form-check-label" for="male">남자</label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="gender" id="female" value="female" disabled v-model="userData.gender">
                <label class="form-check-label" for="female">여자</label>
                </div>
            </div>
            <div class="mb-3">
                <div>
                <label class="form-label">환경</label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="device" id="pc" value="pc" v-model="userData.device">
                <label class="form-check-label" for="pc">PC</label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="device" id="mobile" value="mobile" v-model="userData.device">
                <label class="form-check-label" for="mobile">MOBILE</label>
                </div>
            </div>
            <div class="mb-3">
                <div>
                <label class="form-label">키보드</label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="key" id="qwerty" value="qwerty" v-model="userData.keyInterface">
                <label class="form-check-label" for="qwerty">QWERTY</label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="key" id="천지인" value="천지인" v-model="userData.keyInterface">
                <label class="form-check-label" for="천지인">천지인</label>
                </div>
            </div>
            <div class="mb-3">
                <label for="birth" class="form-label">권한</label>
                <input type="text" class="form-control" id="auth" readonly v-model="userData.auth" placeholder="19900101">
            </div>
            <div class="mb-3" v-if="checkManager">
                <label for="manager" class="d-flex form-label justify-content-between">
                <span>매니저</span>
                <span :class="[managerMessage.status ? 'text-success' : 'text-danger' ]">{{ managerMessage.message }}</span>
                </label>
                <input type="text" class="form-control" id="manager" v-model="userData.manager" placeholder="매니저 전화번호 입력" @keyup="checkManagerId">
            </div>
            <div class="d-flex gap-2 button-list mb-3">
                <button type="button" class="btn btn-primary" @click.prevent="onSubmit">수정하기</button>
                <router-link class="btn btn-primary" :to="{ name: 'main' }">취소</router-link>
            </div>
            <div>
                <span class="text-danger">{{ error }}</span>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { getUserInfo, updateUserInfo, checkId } from '@/api/user' 

export default {
    setup() {
        const userData = ref({
            name: '',
            tel: '',
            birth: '',
            gender: '',
            auth: '',
            device: '',
            keyInterface: '',
            manager: '',
        }),
        error = ref(''),
        checkManager = ref(true),
        managerMessage = ref(''),
        beforeManagerData = ref('')

        const store = useStore(),
        userInfo = store.getters['user/GET_USER_INFO']

        const res = getUserInfo(userInfo.userId)

        res.then(result => {
            var userInfo = result.data.userInfo,
            etc = JSON.parse(userInfo.etc)

            userData.value.name = userInfo.user_name
            userData.value.tel = userInfo.user_id
            userData.value.birth = userInfo.age
            userData.value.gender = userInfo.gender === 'm' ? 'male' : 'female'
            userData.value.auth = etc.auth.join(', ')
            userData.value.device = etc.device
            userData.value.keyInterface = etc.keyInterface
            userData.value.manager = etc.manager
            beforeManagerData.value = etc.manager

            if(userData.value.manager !== ''){
                const variable = {
                    tel: userData.value.tel
                }

                const res = checkId(variable)
                res.then(result => {
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

            if(userData.value.auth.includes('MANAGER')){
                checkManager.value = false
            } 

        }).catch(error => {
            console.log(error)
        })

        const onSubmit = () => {
            const variable = {
                id: userData.value.tel,
                etc: JSON.stringify({
                    device: userData.value.device,
                    manager: userData.value.manager,
                    auth: userData.value.auth.split(', '),
                    keyInterface: userData.value.keyInterface
                }),
                beforeManagerData: beforeManagerData.value
            }

            if(userData.value.manager !== '') {
                if(!managerMessage.value.status){
                    return managerMessage.value.message = '올바른 매니저 연락처를 입력하거나 입력하지 마세요.'
                }
            }
            
            const res = updateUserInfo(variable)
            res.then(result => {
                alert('수정 되었습니다.')
            }).catch(error => {
                if(error.message === 'same'){
                    alert('자기 자신을 매니저로 등록할 수 없습니다.')
                    manager.value = ''
                }
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
            userData,
            error,
            onSubmit,
            checkManager,
            checkManagerId,
            managerMessage
        }
    }
}
</script>

<style scoped>
.container{
    max-width: 600px;
}

h2{
    width: 100%;
}

form{
  width: 100%;
}

.button-list button,
.button-list a{
  width: 100%;
}
</style>