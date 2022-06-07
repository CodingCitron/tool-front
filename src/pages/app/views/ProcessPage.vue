<template>
    <div class="container bg-light p-4 rounded contents box" 
        @contextmenu.prevent="handleClick($event)"
        >
        <section>
            <h3 class="mb-4">스크립트 가공</h3>
            <div class="form-floating mb-3">
                <div class="d-flex align-items-center mb-2">
                    교정 문장
                </div>
                <div class="flex-grow-1 background-white">
                    <p>
                        asa
                    </p>
                </div>
            </div>
            <div class="form-floating mb-3">
                <div class="d-flex align-items-center mb-2">
                    수집 문장
                </div>
                <div class="flex-grow-1 background-white">
                    <p id="errorSentenceArea">
                        asa
                    </p>
                </div>
            </div>
            <div class="form-floating d-flex flex-column">
                
            </div>
        </section>
        <VueSimpleContextMenu
            element-id="contextMenu"
            :options="options"
            ref="vueSimpleContextMenu"
            @option-clicked="optionClicked"
        />
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { createApp } from 'vue'
import VueSimpleContextMenu from 'vue-simple-context-menu'
import { selectText } from '@/util'
import { processSentence } from '@/api/work'
import { useStore } from 'vuex'

export default {
    components: {
        VueSimpleContextMenu
    },

    directives: {
    },

    setup(props, context){
        const vueSimpleContextMenu = ref(null),
        dragedText = ref(selectText()),
        selectedText = ref(''),
        senteceObj = ref([{
            id: '',
            origin_id: '',
            corSentence: '',
            errorSentence: '',
            xmlData: '<sentence></sentence>'
        }])
        
        const store = useStore(),
        user = store.getters['user/GET_USER_INFO']

        const options = ref([
            {
                name: '',
            },
            /*
            {
                type: 'divider',
            },
            */
            {
                name: '근접 오류',
                columnName: 'error_type_near',
            },
            {
                name: '조사 오류',
                columnName: 'error_type_post',
            },
            {
                name: '유사 발음 오류',
                columnName: 'error_type_pron',
            },
            {
                name: '자음 동화 오류',
                columnName: 'error_type_cons',
            },
            {
                name: '띄어쓰기 오류',
                columnName: 'error_type_spac',
            },
            {
                name: '문장부호 오류',
                columnName: 'error_type_mark',
            },
            {
                name: '기타 오류',
                columnName: 'error_type_etc',
            }
        ])

        const handleClick = (e, item) => {
            var { baseNode, anchorOffset, focusOffset } = selectText()
            var text = baseNode.data
            selectedText.value = text.substring(anchorOffset, focusOffset)

            if(baseNode.parentElement && baseNode.parentElement.id === 'errorSentenceArea'){
                selectedText.value = text.substring(anchorOffset, focusOffset)
            } else { 
                selectedText.value = ''
            }

            options.value[0].name = selectedText.value? selectedText.value : '선택 없음'

            vueSimpleContextMenu.value.showMenu(e)
        }

        const optionClicked = e => {
            if(selectedText.value === '') return
            console.log(e)
        }

        const getSentence = () => {
            const res = processSentence({ id: user.userId })

            res.then(result => {    
                console.log(result)
            }).catch(error => {
                console.log(error)
            })
        }

        getSentence()

        return { 
            options,
            handleClick,
            optionClicked,
            vueSimpleContextMenu,
        }
    }   
}
</script>

<style scoped>
.part{
    padding: 0.5rem;
}

.background-white{
    background: white;
}

.background-white p{
    padding: 0.5rem;
}
</style>