<template>
  <div class="container">
    <h3>현재 진행중 작업</h3>
    <div>
        <div>
            
        </div>
    </div>
  </div>
</template>

<script>
import { getMyworks } from '@/api/user'

export default {
    setup(){


        const getData = (option) => {
            const res = getMyworks(option)

            res.then(result => {
                console.log(result)
            }).catch(error => {
                console.log(error)
            })
        }

        getData({ start: 0, limit: 10 })
    }
}
</script>

<style>

</style>