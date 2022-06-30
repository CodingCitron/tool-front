<template>

  <div class="container">
    <div class="row">
      <div class="p-2 col-xxl-3 col-xl-4 col-lg-4 col-md-6" v-for="item in cardData" :hidden="item.hidden"> <!-- A-1 -->
        <Card :title="item.title" 
              :content="item.content" 
              :link="item.link"
              :workGroup="item.workGroup" 
              :linkName="item.linkName"
              :inspection="item.inspection"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/common/Card'
import { ref } from '@vue/reactivity'
import { getUserInfo } from '@/api/user'

export default {
  components: {
    Card
  },
  setup(){
    const data = ref({

    })

    const cardData = ref([
      {
        title: '수집 - 데이터 붙여넣기',
        content: '교정 문장 입력',
        workGroup: 'megastudy',
        link: 'correctionMegaPage',
        linkName: '작업하기',
        inspection: false,
        hidden: false,
        auth: 'WORKER'
      },
      {
        title: '수집 - 검수 - 데이터 붙여넣기',
        content: '교정 문장 검수',
        workGroup: 'megastudy',
        link: 'correctionMegaPage',
        linkName: '작업하기',
        inspection: true,
        hidden: false,
        auth: 'WORKER'
      },
      {
        title: '수집 - 스크립터 입력(유핏)',
        content: '교정 문장을 보고 수집 문장을 입력',
        workGroup: 'ufit',
        link: 'correctionExpertPage',
        linkName: '작업하기',
        hidden: false,
        auth: 'WORKER'
      },
      {
        title: '가공 - 스크립터 입력(유핏)',
        content: '수집 문장 검수',
        workGroup: 'ufit',
        link: 'processExpertPage',
        linkName: '작업하기',
        hidden: false,
        auth: 'MANAGER'
      },
      {
        title: '가공 - 스크립트 가공',
        content: '문장 오류 라벨링',
        workGroup: 'edutech',
        link: 'processPage',
        linkName: '작업하기',
        inspection: false,
        hidden: false,
        auth: 'WORKER'
      },
      {
        title: '가공 - 검수 - 스크립트 가공',
        content: '라벨링 검수',
        workGroup: 'edutech',
        link: 'processPage',
        linkName: '작업하기',
        inspection: true,
        hidden: false,
        auth: 'WORKER'
      },
    ])

    const group = ref('')

    const resUser = getUserInfo()
    resUser.then(result => {
      group.value = result.data.userInfo.group
      const auth = result.data.userInfo.auth
      // 권한이 작업자고  ADMIN은 다 보임

      console.log(group.value)
      if(auth.includes('ADMIN')) return
      if(group.value === 'saltluxInnovation' || group.value === '') return
      for(let i = 0; i < cardData.value.length; i++){
        // console.log(group.value !== cardData.value[i].workGroup)
        // console.log(!auth.includes(cardData.value[i].auth))
        if(group.value !== cardData.value[i].workGroup || !auth.includes(cardData.value[i].auth)) {
            cardData.value[i].hidden = true
        } 

        if(auth.includes('MANAGER') && cardData.value[i].auth === 'WORKER'){ // 매니저는 작업자 못 봄
          cardData.value[i].hidden = true
        } 
      }

    }).catch(error => {
      console.log(error)
    })
    
    return {
      data,
      cardData,
    }
  }
}
</script>

<style scoped>
.link-list{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

a{
  min-width: 320px;
}

.btn{
  font-size: 16px;
}

.row{
  --bs-gutter-x: 0;
}
</style>