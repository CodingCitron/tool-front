<template>
  <div>
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
                <th>{{ item.id }}</th>
                <td>{{ item.sentence }}</td>
                <td>{{ item.cor_sentence }}</td>
                <td class="input"><input type="checkbox" :checked="item.error_type_spac? true : false"  @change="e => {
                changeHandler(e, sentenceArray[index])
                } "></td>
                <td class="input"><input type="checkbox" :checked="item.error_type_mark? true : false" @change="e => {
                changeHandler(e, sentenceArray[index])
                } "></td>
                <td class="input"><input type="checkbox" :checked="item.error_type_etc? true : false"  @change="e => {
                changeHandler(e, sentenceArray[index])
                } "></td>
                <td class="input"><input type="checkbox" :checked="item.error_type_etc? true : false"  @change="e => {
                changeHandler(e, sentenceArray[index])
                } "></td>
                <td><button>적용하기</button></td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getProcessExpertData } from '@/api/work'

export default {
    setup(){
        
        const sentenceArray = ref([])

        const getData = () => {
            const res = getProcessExpertData()

            res.then(result => {
                sentenceArray.value = result.data.data 
            }).catch(error => {
                console.log(error)
            })
        }

        getData()

        const changeHandler = (e, obj) => {
            console.log(e.target.checked)
            console.log(obj)
        }

        return {
            sentenceArray,
            changeHandler
        }
    }
}
</script>

<style scoped>
.input {
    text-align: center;
}
</style>