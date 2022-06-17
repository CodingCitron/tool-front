<template>
  <div class="container">
    <h2 class="mb-3">마이페이지</h2>
    <div class="d-flex">
      <aside>
        <nav>
          <ul>
            <li>
              <router-link :to="{ name: 'myworks' }" >나의작업</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'accountDetail' }" >개인정보</router-link>
            </li>
          </ul>
        </nav>
      </aside>
      <div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.aside{
  width: 200px;
  border-right: 1px solid #ced4da;
}

ul{
  padding: 0;
  font-size: 16px;
}
</style>