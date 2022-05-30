<template>
  <div class="link-list d-grid gap-4">
    <router-link :to="{ name: 'scrape' }" class="btn btn-primary">수집 - 데이터 붙여넣기</router-link>
    <router-link :to="{ name: 'inputErrorSentence' }" class="btn btn-primary">수집 - 스크립트 입력</router-link>
    <router-link :to="{ name: 'inputOriginSentence' }" class="btn btn-primary">수집 - 스크립트 입력 (원문)</router-link>
    <router-link :to="{ name: 'scrape' }" class="btn btn-primary">수집 - 스크립트 음성</router-link>
    <router-link :to="{ name: 'scrape' }" class="btn btn-primary">가공 - 스크립트</router-link>
    <router-link :to="{ name: 'scrape' }" class="btn btn-primary">가공 - 음성</router-link>
    <Card />
  </div>
</template>

<script>
import Card from '@/components/common/Card'

export default {
  components: {
    Card
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
</style>