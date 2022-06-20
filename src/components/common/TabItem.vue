<template>
  <button @click="$emit('input', id)" :class="[active, 'common-button-blue']">
    {{ label }}
  </button>
</template>

<script>
import { computed } from 'vue'

export default {
    props: {
        id: Number,
        label: String,
        value: Number
    },

    setup(props){
        const active = computed(() => {
            return props.value == props.id ? 'active' : false
        })

        return {
            active
        }
    }
}
</script>

<style scoped>

</style>