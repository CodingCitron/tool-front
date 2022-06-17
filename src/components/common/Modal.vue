<template>
    <div class="modal fade" :class="[isOpen? 'show': '']" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content shadow-sm">
                <!--
            <div class="modal-header">
                <h5 class="modal-title">{{ title }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            -->
            <div class="modal-body">
                <slot></slot>
                <div class="d-flex gap-2 justify-content-end">
                    <button type="button" 
                    class="btn btn-secondary"
                    :class="[closeStyle? closeStyle : '']" 
                    data-bs-dismiss="modal" 
                    v-if="close"
                    @click="closeBtnHandler"
                    >{{ close }}
                    </button>
                    <button 
                    type="button" 
                    class="btn btn-primary" 
                    :class="[sureStryle? sureStryle : '']" 
                    v-if="sure">{{ sure }}
                    </button>
                </div>
            </div>
            <!--
            <div class="modal-footer">
                
            </div>
            -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        close: String,
        sure: String,
        isOpen: Boolean,
        closeStyle: String,
        sureStryle: String
    },

    setup(props, context) {

        const closeBtnHandler = e => {
            context.emit('close', e)
        }

        return {
            closeBtnHandler
        }
    }
}
</script>

<style scoped>
.show{
    display: block;
}
</style>