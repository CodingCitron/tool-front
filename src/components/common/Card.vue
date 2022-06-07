<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <p class="card-text">{{ content }}</p>
            <div class="d-flex justify-content-end">
                <router-link class="btn btn-primary" :to="{ name: link }" v-if="!disabled" >{{ linkName }}</router-link>
                <button class="btn btn-primary" v-if="disabled" disabled>{{ linkName }}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        content: String,
        link: String,
        linkName: String,
        disabled: String
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
    font-size: 16px;
}

.card:hover{
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
}
</style>