<template>
  <div class="container bg-light p-4 contents">
        <section>
            <h3 class="mb-4">스크립트 입력 - 교정 문장</h3>
            <div class="form-floating mb-3">
                <div class="d-flex align-items-center mb-2">
                    <span>교정 문장이 없는 수집 문장 [ {{ num? num + 1 + '-' : '' }} {{ sentence.length }} ]</span>
                </div>
                <div class="flex-grow-1">
                    <p class="form-control origin-sentence" v-bind:class="[status ? 'text-danger' : '']">
                        {{ nowSentence }}
                    </p>
                </div>
            </div>
            <div class="form-floating mb-3">
                <div class="d-flex align-items-center mb-2">
                    <label for="inputSentence">교정 문장 입력창</label>
                </div>
                <div class="flex-grow-1">
                    <textarea class="form-control" placeholder="교정 문장 입력하기" id="inputSentence" v-model="inputSentence"></textarea>
                </div>
            </div>
            <div class="form-floating d-flex flex-column">
                <div class="d-flex justify-content-end mb-2 text-secondary">
                    <button class="text-button ps-1 pe-1 text-secondary" @click="eraser">지우기</button>
                </div>
                <div class="d-flex justify-content-end gap-2">
                    <button class="btn btn-success" @click="previous">이전 문장</button>
                    <button class="btn btn-success" @click="next">다음 문장</button>
                    <button class="btn btn-success" @click="onSubmit">제출 하기</button>
                </div>
            </div>
        </section>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { getExpertSentence, inputErrorSentence } from '@/api/work'

export default {
    setup(){
        const sentence = ref([]),
        nowSentence = ref(''),
        status = ref(false),
        inputSentence = ref(''),
        num = ref(0)

        const store = useStore(),
        user = store.getters['user/GET_USER_INFO']

        const init = () => {
            const res = getExpertSentence(user)

            res.then(result => {
                if(result.data.result == 0){
                    status.value = true
                    nowSentence.value = result.data.message 
                } else {
                    for(var i = 0; i < result.data.result.length; i++){
                        result.data.result[i].error_sentence = ''
                    }

                    nowSentence.value = result.data.result[num.value].sentence

                    sentence.value = result.data.result
                    console.log(sentence.value)
                }
            }).catch(error => {
                console.log(error)
            })
        }

        init()

        const eraser = () => {
            inputSentence.value = ''
        }

        const previous = () => {
             if(sentence.value[num.value - 1]){
                num.value--
            }
        }

        const next = () => {
            if(sentence.value[num.value + 1]){
                num.value++
            }
        }

        const onSubmit = () => {
            var variable = []

            for(var i = 0; i < sentence.value.length; i++){
                if(sentence.value[i].error_sentence.trim()){ 
                    variable.push({
                        origin_id: sentence.value[i].id,
                        sentence: sentence.value[i].error_sentence,
                        worker: user.userId,
                        status: 'B'
                    })
                } else {
                    return alert('입력되지 않은 문장이 있습니다.')
                }
            }
            
            const res = inputErrorSentence(variable)

            res.then(result => {
                if(result.message === 'success'){
                    alert('작업을 완료하였습니다.')
                    router.push({ name: 'main' })
                }
            }).catch(error => {
                console.log(error)
            })
        }

        watch(num, () => {
            nowSentence.value = sentence.value[num.value].sentence
            inputSentence.value =  sentence.value[num.value].error_sentence 
        })

        watch(inputSentence, () => {
            if(!sentence.value[num.value]) return
            sentence.value[num.value].error_sentence = inputSentence.value
        })

        return {
            status,
            nowSentence,
            inputSentence,
            sentence,
            num,
            eraser,
            previous,
            next,
            onSubmit
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