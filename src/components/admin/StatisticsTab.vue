<template>
    <div :class="[props.view === props.name ? '' : 'hidden']">
        <div class="d-flex justify-content-between align-items-center mb-2">
            <h3>통계</h3>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        view: String
    },

    setup(props){

        return {
            props
        }
    }
}
</script>

<style>

</style>