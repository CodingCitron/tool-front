<template>
    <div :class="[props.view === props.name ? '' : 'hidden']">
        <h3>작업자 관리</h3>
        <div>
            <table class="table table-hover shadow-sm">
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

export default {
    props: {
        name: String,
        view: String
    },

    setup (props) {
        return {
            props
        }
    }
}
</script>

<style>

</style>