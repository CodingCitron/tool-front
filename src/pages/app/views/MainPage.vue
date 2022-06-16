<template>
<!--
  <div class="link-list d-grid gap-4">
    <router-link :to="{ name: 'scrape' }" class="btn btn-primary">수집 - 데이터 붙여넣기</router-link>
    <router-link :to="{ name: 'postExpertData' }" class="btn btn-primary">수집 - 스크립트 입력</router-link>
    <router-link :to="{ name: 'inputOriginSentence' }" class="btn btn-primary">수집 - 스크립트 입력 (원문)</router-link>
    <router-link :to="{ name: 'scrape' }" class="btn btn-primary">수집 - 스크립트 음성</router-link>
    <router-link :to="{ name: 'scrape' }" class="btn btn-primary">가공 - 스크립트</router-link>
    <router-link :to="{ name: 'scrape' }" class="btn btn-primary">가공 - 음성</router-link>
  </div>
-->
  <div class="container">
    <div class="row">
      <div class="p-2 col-xxl-3 col-xl-4 col-lg-4 col-md-6"> <!-- A-1 -->
        <Card title="수집 - 데이터 붙여넣기" 
        content="교정 문장 입력" 
        link="correctionMegaPage" 
        linkName="작업하기"/>
      </div>
      <div class="p-2 col-xxl-3 col-xl-4 col-lg-4 col-md-6"> <!-- A-1-inspection -->
        <Card title="수집 - 검수 - 데이터 붙여넣기" 
        content="교정 문장 검수" 
        link="correctionMegaPage"  
        :inspection="true" 
        linkName="작업하기"/>
      </div>
      <div class="p-2 col-xxl-3 col-xl-4 col-lg-4 col-md-6"> <!-- A-2 -->
        <Card title="수집 - 스크립트 입력" 
        content="교정 문장을 보고 수집 문장을 입력" 
        link="correctionExpertPage" 
        linkName="작업하기" />
      </div>
      <div class="p-2 col-xxl-3 col-xl-4 col-lg-4 col-md-6"> <!-- A-2-inspection -->
        <Card title="수집 - 검수 - 스크립트 입력" 
        content="수집 문장 검수" 
        link="correctionExpertPage" 
        :inspection="true" 
        linkName="작업하기" />
      </div>
      <div class="p-2 col-xxl-3 col-xl-4 col-lg-4 col-md-6"> <!-- C -->
        <Card title="가공 - 스크립트 가공" 
        content="문장 오류 라벨링" 
        link="processPage" 
        linkName="작업하기" />
      </div>
        <div class="p-2 col-xxl-3 col-xl-4 col-lg-4 col-md-6"> <!-- C -->
        <Card title="가공 - 검수 - 스크립트 가공" 
        content="라벨링 검수" 
        link="processPage" 
        linkName="작업하기" 
        :inspection="true"
        />
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