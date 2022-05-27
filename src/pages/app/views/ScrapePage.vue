<template>
  <div class="container">
    <section class="mb-5">
      <h2 class="mb-4">데이터 붙여넣기</h2>
      <div class="form-floating mb-3 d-flex">
        <div class="d-flex align-items-center me-3">
          <label for="input">원문 입력</label>
        </div>
        <div class="flex-grow-1">
          <textarea class="form-control" placeholder="input(게시판 글 오류 수정하여 넣는 곳)" id="input" v-model="originalText"></textarea>
        </div>
      </div>
      <div class="form-floating mb-3 d-flex">
        <div class="d-flex align-items-center me-3">
          <label for="paste">수집 문장</label>
        </div>
        <div class="flex-grow-1">
          <textarea class="form-control" placeholder="paste(게시판 글 붙여넣는 곳)" id="paste" v-model="errorText"></textarea>
        </div>
      </div>
      <div class="form-floating mb-3 d-flex flex-column">
        <div class="d-flex justify-content-end mb-2 text-secondary">
          <span class="ps-1 pe-1">{{ originalText.length }}</span>
          <span>|</span>
          <span class="ps-1 pe-1">{{ errorText.length }}</span>
          <span>|</span>
          <button class="text-button ps-1 pe-1 text-secondary" @click="eraser">지우기</button>
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-success" @click.prevent="textSubmit">제출하기</button>
        </div>
      </div>
    </section>
    <section>
      <div class="mb-4 d-flex justify-content-between">
        <div class="d-flex tab-button">
          <TabItem 
            v-for="item in tab"
            v-bind="item" :key="item.id"
            :value="current"
            @input="changeTab"
            />
        </div>
        <div>
            <input type="file" class="form-control" @change="readFile">
        </div>
      </div>
      <div>
        <div class="form-floating bg-light background p-4" :class="currentId.id === 1 ? 'active' : 'hidden'">
          <table class="table">
            <thead>
              <tr>
                <th v-for="(item, i) in tableHeader" >{{ item }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(line, i) in tableBody" >
                <td v-for="(item, i) in line">{{ item }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="form-floating bg-light background p-4" :class="currentId.id === 2 ? 'active' : 'hidden'">
            <table class="table">
              <thead>
                <tr>
                  <th>구분</th>
                  <th>원문</th>
                  <th>수집 문장</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in submittedText">
                  <td>{{ i }}</td>
                  <td>{{ item.originalText }}</td>
                  <td>{{ item.errorText }}</td>
                </tr>
              </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-success mt-2" @click.prevent="csvSubmit">CSV 제출하기
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { csvToJSON } from '@/util'
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { scrape, inputCsv } from '@/api/work'
import TabItem from '@/components/common/TabItem'
import { useStore } from 'vuex'

export default {
  components: {
    TabItem,
  },

  setup(){
    const current = ref(1),
    tab = ref([
      {
        id: 1,
        label: 'CSV 파일',
      },
      {
        id: 2,
        label: '제출한 글 목록',
      }
    ]),
    tableHeader = ref([]),
    tableBody = ref([]),
    csvJsonData = ref([]),
    originalText = ref(''),
    errorText = ref(''),
    submittedText = ref([

    ])

    const store = useStore(),
    user = store.getters['user/GET_USER_INFO']

    const readFile = e => {
      if(!e.target) return
      const file = e.target.files[0]

      if(file.type !== 'text/csv') {
        e.target.value = ''
        return alert('csv 파일만 업로드 하세요.') 
      }
      const reader = new FileReader()

      reader.onload = function(e){
        tableHeader.value = []
        tableBody.value = []

        csvJsonData.value = csvToJSON(e.target.result)
        createTable(csvJsonData.value)
        current.value = 1
      }

      reader.readAsText(file, 'UTF-8')   
    }

    const createTable = (json) => {
      for(var i = 0; i < Object.keys(json).length; i++){
        if(i === 0){
          tableHeader.value.push(...Object.values(json[i]))
        }else{
          tableBody.value.push(Object.values(json[i]))
        }
      }
    }

    const currentId = computed(() => {
      return tab.value.find(el => el.id === current.value) || {}
    })

    const changeTab = id => {
      current.value = id
    }

    const textSubmit = () => {
      if(originalText.value === '' || errorText.value === '') return alert('텍스트를 입력해 주세요.')
      

      var variable = {
        userId: user.userId,
        userName: user.userName, 
        originalText: originalText.value,
        errorText: errorText.value,
      } 
      
      const res = scrape(variable)

      res.then(result => {
        if(result.data.message === 'duplicate'){
          return alert('중복 문장입니다.')
        }

        submittedText.value.unshift(variable)

        originalText.value = ''
        errorText.value = ''
        current.value = 2
        console.log(result)
      }).catch(error => {
        console.log(error)
      })
    } 

    const eraser = () => {
      originalText.value = ''
      errorText.value = ''
    }

    const csvSubmit = () => {    
      if(!csvJsonData.value) return alert('입력된 CSV 파일이 없습니다.')
      
      variable = []
      console.log(csvJsonData.value)
      for(var i = 1; i < csvJsonData.value.length; i++){
        variable.push({
          sentence: csvJsonData.value[i].error_sentence,
          registrant: user.userId,
          status: 'mega',
          error_type_spac: csvJsonData.value[i].error_type_spac,
          error_type_mark: csvJsonData.value[i].error_type_mark,
          error_type_etc: csvJsonData.value[i].error_type_etc,
          meta_category: csvJsonData.value[i].meta_category,
          meta_interface: csvJsonData.value[i].meta_interface,
          meta_keyboard: csvJsonData.value[i].meta_keyboard,
          meta_gender: csvJsonData.value[i].meta_gender,
          meta_age: csvJsonData.value[i].meta_age,
          reg_date: csvJsonData.value[i].reg_date,
        })
      }

      const res = inputCsv(variable)

      res.then(result => {
        alert('제출 되었습니다.')
      }).catch(error => {
        console.log(error)
      })
   }

    return {
      tab,
      current,
      tableHeader,
      tableBody,
      readFile,
      currentId,
      changeTab,
      originalText,
      errorText,
      submittedText,
      textSubmit,
      eraser,
      csvSubmit
    }
  },
}
</script>

<style>
h2{
  font-size: 24px;
}

.text-button{
  border: none;
  background: none;
}

.background{
  min-height: 300px;
  border-radius: 0.25rem;
}

.table{
  font-size: 12px;
}

.tab-button{
  gap: 4px;
}
</style>