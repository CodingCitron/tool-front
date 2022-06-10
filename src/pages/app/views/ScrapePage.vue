<template>
  <div class="wrap">
    <div class="container contents bg-light p-4 mb-5">
      <section>        
        <h3 class="mb-4">데이터 붙여넣기</h3>
         <div class="form-floating mb-3 d-flex flex-column">
          <div class="d-flex align-items-center mb-2">
            <label for="paste">수집 문장</label>
          </div>
          <div class="flex-grow-1">
            <textarea class="form-control" placeholder="paste(게시판 글 붙여넣는 곳)" id="paste" v-model="errSentence"></textarea>
          </div>
        </div>
        <div class="form-floating mb-3 d-flex flex-column">
          <div class="d-flex align-items-center mb-2">
            <label for="input">교정 문장</label>
          </div>
          <div class="flex-grow-1">
            <textarea class="form-control" placeholder="input(게시판 글 오류 수정하여 넣는 곳)" id="input" v-model="corSentence"></textarea>
          </div>
        </div>
        <div class="form-floating d-flex flex-column">
          <div class="d-flex justify-content-end mb-2 text-secondary">
            <span class="ps-1 pe-1">{{ corSentence.length }}</span>
            <span>|</span>
            <span class="ps-1 pe-1">{{ errSentence.length }}</span>
            <span>|</span>
            <button class="text-button ps-1 pe-1 text-secondary" @click="eraser">지우기</button>
          </div>
        </div>
        <div class="d-flex justify-content-end">
            <button class="btn btn-success" @click.prevent="textSubmit">제출하기</button>
        </div>
      </section>
    </div>
    <div class="container contents bg-light background p-4">
      <section>
        <div class="mb-4 d-flex justify-content-between sticky-left">
          <div class="d-flex tab-button">
            <TabItem 
              v-for="item in tab"
              v-bind="item" :key="item.id"
              :value="current"
              @input="changeTab"
              />
          </div>
          <div>
              <input type="file" class="form-control hidden" @change="readFile">
          </div>
        </div>
        <div class="overflow-auto">
          <div class="form-floating background" :class="currentId.id === 2 ? 'active' : 'hidden'">
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
          <div class="form-floating background" :class="currentId.id === 1 ? 'active' : 'hidden'">
              <table class="table">
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>교정 문장</th>
                    <th>수집 문장</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in pagination.view">
                    <td>{{ i }}</td>
                    <td>{{ item.corSentence }}</td>
                    <td>{{ item.errSentence }}</td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
        <div class="d-flex justify-content-between sticky-left">
          <nav aria-label="Page navigation example">
              <ul class="pagination">
                  <li class="page-item">
                    <button :class="[pagination.pageLength > 1? 'page-link active' : 'hidden' ]" @click="() => pagingBtn(pagination.nowPage - 1)">이전</button>
                  </li>
                  <li v-for="(item) in Math.ceil(pagination.length / pagination.getLength)" 
                    :class="[pagination.nowPage === item? 'active page-item' : 'page-item']"
                  >
                    <button class="page-link" @click="() => pagingBtn(item)" >{{ item }}</button>
                  </li>
                  <li class="page-item">
                    <button :class="[pagination.pageLength > 1? 'page-link active' : 'hidden' ]" @click="() => pagingBtn(pagination.nowPage + 1)">다음</button>
                  </li>
              </ul>
          </nav>
          <button type="button" class="btn btn-success mt-2 hidden" @click.prevent="csvSubmit">CSV 제출하기
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { csvToJSON } from '@/util'
import { ref } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core'
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
        label: '제출한 글 목록',
      },
      {
        id: 2,
        label: '엑셀 파일',
        hidden: true,
        disabled: true
      },
    ]),
    tableHeader = ref([]),
    tableBody = ref([]),
    csvJsonData = ref([]),
    corSentence = ref(''),
    errSentence = ref(''),
    submittedText = ref([]),
    pagination = ref({
      nowPage: 1, 
      pageLength: 0,
      length: 0,
      getLength: 10,
      view: []
    })

    watch(submittedText.value, (newCount, oldCount) => {
      var len = submittedText.value.length
      pagination.value.length = len
      pagination.value.pageLength = Math.ceil(len/pagination.value.getLength)

      console.log(pagination.value)
      pagingBtn(pagination.value.nowPage)
    })

    const pagingBtn = index => {
      var start = (index - 1)  * pagination.value.getLength
      var end = index * pagination.value.getLength
      pagination.value.view = submittedText.value.slice(start, end)
      pagination.value.nowPage = index
    } 

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
      console.log(submittedText.value)
      if(corSentence.value === '' || errSentence.value === '') return alert('텍스트를 입력해 주세요.')
      
      var variable = {
        userId: user.userId,
        userName: user.userName, 
        corSentence: corSentence.value,
        errSentence: errSentence.value,
      } 
      
      const res = scrape(variable)

      res.then(result => {
        if(result.data.message === 'duplicate'){
          return alert('중복 문장입니다.')
        }

        submittedText.value.unshift(variable)

        corSentence.value = ''
        errSentence.value = ''
        current.value = 1
      }).catch(error => {
        console.log(error)
      })
    } 

    const eraser = () => {
      corSentence.value = ''
      errSentence.value = ''
    }

    const csvSubmit = () => {    
      if(!csvJsonData.value.length) return alert('입력된 CSV 파일이 없습니다.')

      var variable = []

      for(var i = 1; i < csvJsonData.value.length; i++){
        variable.push({
          sentence: csvJsonData.value[i].error_sentence,
          registrant: user.userId,
          status: 'A',
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
      corSentence,
      errSentence,
      submittedText,
      pagination,
      pagingBtn,
      textSubmit,
      eraser,
      csvSubmit
    }
  },
}
</script>

<style scoped>
.wrap{
  width: 100%;
}

.text-button{
  border: none;
  background: none;
}

.background{
  min-height: 200px;
  border-radius: 0.25rem;
}

.table{
  font-size: 12px;
}

.tab-button{
  gap: 4px;
}

.contents{
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.sticky-left{
  position: sticky;
  left: 0;
}
</style>