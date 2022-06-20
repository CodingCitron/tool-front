<template>
  <div class="container bg-light p-4 rounded contents">
        <section>
            <h3 class="mb-4">{{ pageType.inspection? '검수 - ' : '수집 - ' }}스크립트 입력</h3>
            <div class="form-floating mb-3">
                <div class="d-flex align-items-center mb-2">
                    <span v-if="sentence.length === 0"></span>
                    <span>교정 문장 
                        <span v-if="sentence.length === 0"></span>
                        <!-- <span v-else>{{ sentence.length }}</span> -->
                    </span>
                </div>
                <div class="flex-grow-1">
                    <p class="form-control cor-sentence" v-bind:class="[status ? 'text-danger' : '']">
                        {{ nowSentence }}
                    </p>
                </div>
            </div>
            <div class="form-floating mb-3">
                <div class="d-flex align-items-center mb-2">
                    <label for="inputSentence">수집 문장</label>
                </div>
                <div class="flex-grow-1">
                    <textarea class="form-control" @keydown="e => { enter(e), notUseBackspaceKey(e) }" @keypress="notUseBackspaceKey" @keyup="notUseBackspaceKey" placeholder="수집 문장 입력하기" id="inputSentence" ref="textareaEl" v-model="inputSentence" autofocus :class="[status ? 'text-danger' : '']" :readonly="status">
                    </textarea>
                </div>
            </div>
            <div class="form-floating d-flex justify-content-between">
                <div class="memo mb-2 text-danger">
                    {{ pageType.inspection? '' : 'Backspace Key가 동작하지 않습니다.' }} 
                </div>
                <!--
                <div class="d-flex justify-content-end mb-2 text-secondary">
                    <button class="text-button ps-1 pe-1 text-secondary" @click="eraser">지우기</button>
                </div>
                -->
                <div class="d-flex justify-content-end gap-2">
                    <button class="btn btn-success hidden" @click="previous">이전 문장</button>
                    <button class="btn btn-success hidden" @click="next">다음 문장</button>
                    <router-link class="common-button-blue" :to="{ name: 'main' }">작업 선택</router-link>
                    <button class="common-button-green" @click="onSubmit">다음 문장</button>
                </div>
            </div>
        </section>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import router from '@/pages/app/router'
import { useRoute } from 'vue-router'
import { getExpertData, postExpertData, postExpertInspectionData } from '@/api/work'

export default {
    setup(){
        const route = useRoute()

        const pageType = { 
            inspection: (route.query.inspection === 'true')
        } 

        const sentence = ref({}),
        nowSentence = ref(''),
        status = ref(false),
        inputSentence = ref(''),
        num = ref(0),
        textareaEl = ref('')

        const store = useStore(),
        user = store.getters['user/GET_USER_INFO']

        const getData = () => {
            const res = getExpertData(pageType)

            res.then(result => {
                if(pageType.inspection){
                    sentence.value = result.data.result
                    nowSentence.value = result.data.result.cor_sentence
                    inputSentence.value = result.data.result.sentence
                } else { 
                    nowSentence.value = result.data.result.sentence
                    sentence.value = result.data.result
                }
            }).catch(error => {
                console.log(error)
                status.value = true
                nowSentence.value = '가져올 수 있는 문장이 없습니다.'
                inputSentence.value = '가져올 수 있는 문장이 없습니다.'
            })
        }

        getData()

        const eraser = () => {
            inputSentence.value = ''
        }

        const previous = () => {
             if(sentence.value[num.value - 1]){
                num.value--
                textareaEl.value.focus()
            }
        }

        const next = () => {
            if(sentence.value[num.value + 1]){
                num.value++
                textareaEl.value.focus()
            }
        }

        const onSubmit = () => {
            if(status.value) return
            if(!sentence.value.error_sentence || sentence.value === '') return alert('제출할 수 없습니다.')
            if(!sentence.value) return alert('제출할 수 없습니다.')

            if(!pageType.inspection){ // 수집
                let variable = {
                    origin_id: sentence.value.id,
                    sentence: sentence.value.error_sentence,
                    inspection: pageType.inspection
                }
   
                const res = postExpertData(variable)

                res.then(result => {
                    if(result.data.message === 'success'){
                        getData()
                        eraser()
                    }
                }).catch(error => {
                    console.log(error)
                })
            } else { // 검수
                let variable = {
                    id: sentence.value.id,
                    origin_id: sentence.value.origin_id,
                    sentence: sentence.value.error_sentence,
                    inspection: pageType.inspection
                }

                const res = postExpertData(variable)

                res.then(result => {
                    if(result.data.message === 'success'){
                        getData()
                        eraser()
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        }

        watch(num, () => {
            nowSentence.value = sentence.value.sentence
            inputSentence.value =  sentence.value.error_sentence 
        })

        watch(inputSentence, () => {
            if(!sentence.value) return
            sentence.value.error_sentence = inputSentence.value
        })

        const notUseBackspaceKey = (e) => {
            if(pageType.inspection) return
            if(e.key === 'Backspace' || e.keyCode === 8) e.preventDefault()
        }
        
        const enter = (e) => {
            if(e.key === 'Enter') {
                e.preventDefault()
                onSubmit()
            }
        }

        return {
            status,
            nowSentence,
            inputSentence,
            sentence,
            num,
            eraser,
            previous,
            next,
            onSubmit,
            notUseBackspaceKey,
            textareaEl,
            pageType,
            enter
        }
    }
}
</script>

<style scoped>
.origin-sentence{
    min-height: 30px;
}

.text-button{
    border: none;
    background: none;
}

.contents{
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
}
</style>