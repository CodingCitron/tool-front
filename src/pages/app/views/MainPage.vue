<template>
<!--
  <div class="link-list d-grid gap-4">
    <router-link :to="{ name: 'scrape' }" class="btn btn-primary">수집 - 데이터 붙여넣기</router-link>
    <router-link :to="{ name: 'inputErrorSentence' }" class="btn btn-primary">수집 - 스크립트 입력</router-link>
    <router-link :to="{ name: 'inputOriginSentence' }" class="btn btn-primary">수집 - 스크립트 입력 (원문)</router-link>
    <router-link :to="{ name: 'scrape' }" class="btn btn-primary">수집 - 스크립트 음성</router-link>
    <router-link :to="{ name: 'scrape' }" class="btn btn-primary">가공 - 스크립트</router-link>
    <router-link :to="{ name: 'scrape' }" class="btn btn-primary">가공 - 음성</router-link>
  </div>
-->
  <div class="container">
    <div class="row">
      <div class="p-2 col-xxl-3 col-xl-4 col-lg-4 col-md-6">
        <Card title="수집 - 데이터 붙여넣기" content="..." link="scrape" linkName="작업하기" />
      </div>
      <div class="p-2 col-xxl-3 col-xl-4 col-lg-4 col-md-6">
        <Card title="수집 - 스크립트 입력" content="교정 문장을 보고 오류 문장을 입력하세요." link="inputErrorSentence" linkName="작업하기" />
      </div>
      <div class="p-2 col-xxl-3 col-xl-4 col-lg-4 col-md-6">
        <Card title="수집 - 스크립트 입력 (원문)" content="수집..." link="inputOriginSentence" linkName="작업하기" />
      </div>
      <div class="p-2 col-xxl-3 col-xl-4 col-lg-4 col-md-6">
        <Card title="수집 - 스크립트 음성" content="수집..." link="inputOriginSentence" linkName="작업하기" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/common/Card'
import { ref } from '@vue/reactivity'

export default {
  components: {
    Card
  },
  setup(){
    const data = ref({
      
    })
    
    return {
      data
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