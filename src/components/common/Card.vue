<template>
    <div class="card" :class="[hidden? 'hidden' : '']">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <p class="card-text">{{ content }}</p>
            <div class="d-flex justify-content-end">
                <router-link :class="[inspection? 'common-button-green'
                : 'common-button-blue']" :to="{ name: link, query: { inspection } }" v-if="!disabled" >{{ linkName }}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'

export default {
    props: {
        title: String,
        content: String,
        link: String,
        linkName: String,
        disabled: String,
        workGroup: String,
        inspection: Boolean,
        hidden: Boolean
    },

    setup(props){
        return {

        }
    }
}
</script>

<style>
.card{
    padding: 0;
    transition: box-shadow 0.3s;
}

.card-title{
    font-weight: 600;
    font-size: 20px;
}

.card:hover{
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
}
.common-button-blue
.common-button-green{
    font-size: 14px;
}
</style>