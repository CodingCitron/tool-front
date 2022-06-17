<template>
    <div>
        <h3>작업자 관리</h3>
        <div>
            <table class="table table-hover shadow-sm rounded">
                <thead>
                    
                </thead>
                <tbody>
                  
                </tbody>
            </table>    
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { getUserData } from '@/api/manage'

export default {
    props: {
        name: String,
        view: String
    },

    setup (props) {
        const setTable = (limit) => {
            const res = getUserData(limit)

            res.then(result => {
                console.log(result)
            }).catch(error => {
                console.log(error)
            })
        }

        setTable({ start: 0, end: 10 })
        
        return {

        }
    }
}
</script>

<style>

</style>