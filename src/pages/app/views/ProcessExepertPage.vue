<template>
  <div>
    <h3 class="mb-2">가공</h3>
    <div class="mb-2">진행한 건[{{ progressCount }}] / 전체 건[{{ allCount }}]</div>
    <table class="table">
        <thead>
            <tr>
                <th>아이디</th>
                <th>교정 문장</th>
                <th>수집 문장</th>
                <th>띄어쓰기 오류</th>
                <th>문장부호 오류</th>
                <th>기타 오류1</th>
                <th>기타 오류2</th>
                <th>적용</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in sentenceArray">
                <td>{{ item.id }}</td>
                <td>{{ item.sentence }}</td>
                <td>{{ item.cor_sentence }}</td>
                <td class="input">
                    <input type="checkbox" :checked="item.error_type_spac? true : false"  @change="e => {
                changeHandler(e, sentenceArray[index], 'error_type_spac')
                } " :disabled="item.disabled">
                </td>
                <td class="input">
                    <input type="checkbox" :checked="item.error_type_mark? true : false" @change="e => {
                changeHandler(e, sentenceArray[index], 'error_type_mark')
                } " :disabled="item.disabled">
                </td>
                <td class="input">
                    <input type="checkbox" :checked="item.error_type_etc? true : false"  @change="e => {
                changeHandler(e, sentenceArray[index], 'error_type_etc')
                } " :disabled="item.disabled">
                </td>
                <td class="input">
                    <input type="checkbox" :checked="item.error_type_etc_2? true : false"  @change="e => {
                changeHandler(e, sentenceArray[index], 'error_type_etc_2')
                } " :disabled="item.disabled">
                </td>
                <td>
                    <button class="common-button-blue" @click="(e) => { clickHandler(e, sentenceArray[index]) }">적용하기</button>
                </td>
            </tr>
            <tr v-if="!sentenceArray.length" style="text-align: center;">
                <td colspan="8">
                    가져올 수 있는 데이터가 없습니다.
                </td>
            </tr>
        </tbody>
    </table>
    <div class="d-flex justify-content-end">
        <button @click="nextData" class="common-button-green">다음 목록 가져오기</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getProcessExpertData, postProcessExpertData } from '@/api/work'

// 띄어쓰기 spac
// 문장부호 mark
export default {
    setup(){
        const sentenceArray = ref([]),
        allCount = ref(null),
        progressCount = ref(null),
        getData = (option) => {
            const res = getProcessExpertData()

            res.then(result => {
                sentenceArray.value = result.data.data 
                allCount.value = result.data.all 
                progressCount.value = result.data.progress 

                if(option){
                    if(sentenceArray.value.length == 0){
                        alert('가져올 수 있는 데이터가 없습니다.')
                    }
                }

            }).catch(error => {
                console.log(error)
            })
        }

        getData()

        const changeHandler = (e, obj, errorType) => {
            if(obj[errorType] == 0 || obj[errorType] == null) obj[errorType] = 1
            else obj[errorType] = 0
        }

        const clickHandler = (e, obj) => {
            // update 
            if(!confirm('적용하시겠습니까?')) return
            obj.disabled = true
            e.target.disabled = true
            
            const res = postProcessExpertData(obj)

            res.then(result => {
                console.log(result)
                allCount.value = result.data.all 
                progressCount.value = result.data.progress 
            }).catch(error => {
                console.log(error)
            })
        }

        const nextData = () => {
            getData('next')
        }

        return {
            sentenceArray,
            changeHandler,
            clickHandler,
            allCount,
            progressCount,
            nextData
        }
    }
}
</script>

<style scoped>
.input {
    text-align: center;
}

button{
    font-size: 14px;
}

th{
    text-align: center;
    vertical-align: middle;
    min-width: 100px;
}

td{
    vertical-align: middle;
}
</style>