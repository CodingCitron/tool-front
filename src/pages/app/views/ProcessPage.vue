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
                <div class="flex-grow-1 background-white cor-sentence">
                    <p v-if="senteceObj.corSentence">
                        {{ senteceObj.corSentence }}
                    </p>
                    <p v-if="!senteceObj.corSentence" class="text-danger">
                        가져올 수 있는 문장이 없습니다.
                    </p>
                </div>
            </div>
            <div class="form-floating mb-3">
                <div class="d-flex align-items-center mb-2">
                    수집 문장
                </div>
                <div class="flex-grow-1 background-white err-sentence">
                    <p id="errorSentenceArea" v-if="senteceObj.errorSentence" v-html="selectedText.viewText">
                    </p>
                    <p v-if="!senteceObj.errorSentence" class="text-danger">
                        가져올 수 있는 문장이 없습니다.
                    </p>
                </div>
            </div>
            <div class="form-floating d-flex gap-3 mb-3">
                <div v-for="item in options" class="align-items-center gap-1" :class="[item.disabled? 'hidden' : 'd-flex']">
                    <div :style="{ background: item.background, width: '18px', height: '18px', borderRadius: '50%' }"></div>
                    <div>{{ item.name }}</div>
                </div>
            </div>
            <div class="form-floating mb-3 bg-white p-2 rounded">
                <div class="d-flex justify-content-end">
                    <button class="btn btn-primary btn-sm mb-1" @click="removeSpan">초기화</button>
                </div>
                <div class="d-flex gap-2 flex-nowrap">
                    <button v-for="item in selectedText.button" 
                    class="btn btn-primary btn-sm" :title="item.title" @click="removeOneSpan(item.id)">{{ item.name }}</button>
                </div>
            </div>
             <div class="form-floating mb-3 bg-white p-2 rounded">
                <div class="d-flex mb-2">
                    XML 데이터
                </div>
                <pre id="xmlView">{{ selectedText.viewXmlData }}</pre>
                    <!-- 문법 하이라이트
                    <code class="xml rounded" id="xmlView">{{ selectedText.viewXmlData }}</code>
                    <code class="xml" style="display: none" id="xmlData">{{ selectedText.xmlData }}</code> 
                    -->
            </div>
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-success" @click="onSubmitHandler">제출하기</button>
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
import { createApp, watchEffect, watch, onMounted } from 'vue'
import VueSimpleContextMenu from 'vue-simple-context-menu'
import { selectText } from '@/util'
import { processSentence, submitProcessSentence } from '@/api/work'
import { useStore } from 'vuex'
// import hljs from 'highlight.js'
// import css from 'highlight.js/lib/languages/css'
// import html from 'highlight.js/lib/languages/xml'

export default {
    components: {
        VueSimpleContextMenu
    },

    setup(props, context){
        const vueSimpleContextMenu = ref(null),
        dragedText = ref(selectText()),
        selectedText = ref({
            start: '',
            end: '',
            selectData: '',
            text: '',
            viewText: '',
            xmlData : '',
            viewXmlData: '',
            button: [],
            cnt: 0
        }),

        senteceObj = ref({
            id: '',
            origin_id: '',
            corSentence: '',
            errorSentence: '',
            processJson: '',
            error_type_near: 0,
            error_type_post: 0,
            error_type_pron: 0,
            error_type_cons: 0,
            error_type_spac: 0,
            error_type_mark: 0,
            error_type_etc: 0
        }),
        errorSentenceArea = ref('')
        
        // hljs.registerLanguage('css', css)
        // hljs.registerLanguage('html', html)

        const store = useStore(),
        user = store.getters['user/GET_USER_INFO']

        const options = ref([
            {
                name: '',
                disabled: true
            },
            /*
            {
                type: 'divider',
            },
            */
            {
                name: '근접 오류',
                columnName: 'error_type_near',
                tag: '<error type="near">',
                errorName: 'near',
                background: 'red',
                color: 'white',
                border: '2px solid black'
            },
            {
                name: '조사 오류',
                columnName: 'error_type_post',
                tag: '<error type="post">',
                errorName: 'post',
                background: 'yellow',
                color: 'black',
                border: '2px solid black'

            },
            {
                name: '유사 발음 오류',
                columnName: 'error_type_pron',
                tag: '<error type="pron">',
                errorName: 'pron',
                background: 'green',
                color: 'white',
                border: '2px solid black'

            },
            {
                name: '자음 동화 오류',
                columnName: 'error_type_cons',
                tag: '<error type="cons">',
                errorName: 'cons',
                background: 'blue',
                color: 'white',
                border: '2px solid black'

            },
            {
                name: '띄어쓰기 오류',
                columnName: 'error_type_spac',
                tag: '<error type="spac">',
                errorName: 'spac',
                background: 'silver',
                color: 'white',
                border: '2px solid black'

            },
            {
                name: '문장부호 오류',
                columnName: 'error_type_mark',
                tag: '<error type="mark">',
                errorName: 'mark',
                background: 'purple',
                color: 'white',
                border: '2px solid black'

            },
            {
                name: '기타 오류',
                columnName: 'error_type_etc',
                tag: '<error type="etc">',
                errorName: 'etc',
                background: 'tomato',
                color: 'white',
                border: '2px solid black'

            },
        ])

        const handleClick = (e, item) => {
            var { baseNode, anchorOffset, focusOffset, extentNode } = selectText()

            var text = senteceObj.value.errorSentence
            selectedText.value.text = selectText().toString()

            if(baseNode.parentElement && baseNode.parentElement.id === 'errorSentenceArea' && extentNode.parentNode.id === 'errorSentenceArea'){
                selectedText.value.start = anchorOffset
                selectedText.value.end = focusOffset - anchorOffset
                selectedText.value.range = window.getSelection().getRangeAt(0)
                selectedText.value.selectData = selectText().toString()
            } else {
                selectedText.value.text = ''
            }

            options.value[0].name = selectedText.value.text? selectedText.value.text : '선택 없음'
            vueSimpleContextMenu.value.showMenu(e)
        }

        const optionClicked = e => {
            let { selectionArray, text } = selectedText.value

            if(e.option.columnName) {
                if(selectedText.value.text === '') return
                let errorSentenceArea = document.getElementById('errorSentenceArea'),
                innerHTML = errorSentenceArea.innerHTML

                let style = `style='color: ${ e.option.color }; background-color: ${ e.option.background }';`, 
                { start, end, range, selectData, cnt } = selectedText.value,
                span = stylizeHighlightedString(start, end, range, e.option, selectData, cnt)
                
                if(span.querySelector('span')){ // 자식 태그 중에 스팬이 있다면 
                    errorSentenceArea.innerHTML = innerHTML

                    return // 리턴한다.
                } else { 
                    selectedText.value.button.push({
                        name: selectData.trim() === ''? '공백' : selectData,
                        id: cnt,
                        title: e.option.name
                    })

                    senteceObj.value[e.option.columnName]++

                    xmlParse()
                }

                selectedText.value.cnt++
            }
        }

        function removeSpan(){
            // errorSentenceArea
            var errorSentenceArea = document.getElementById('errorSentenceArea')
            errorSentenceArea.innerHTML = senteceObj.value.errorSentence
            selectedText.value.viewText = senteceObj.value.errorSentence
            selectedText.value.button = []

            xmlParse()
        }

        function stylizeHighlightedString(start, end, range, option, selectData, id) {
            // For diagnostics
            var selectionContents = range.extractContents()
            var span = document.createElement('span')

            span.appendChild(selectionContents)
            span.dataset.spanId = id
            span.dataset.error = option.errorName

            span.style.backgroundColor = option.background
            span.style.color = option.color
            span.style.border = option.border

            range.insertNode(span)

            return span
        }

        const getSentence = () => {
            // console.log('getSentence')
            const res = processSentence({ id: user.userId })

            // console.log(selectedText.value)
            selectedText.value.button = []

            res.then(result => {    
                // console.log(result)
                if(result && result.data.data){

                    var data = result.data.data
                    senteceObj.value.id = data.id
                    senteceObj.value.orgin_id = data.orgin_id
                    senteceObj.value.corSentence = data.corSentence
                    senteceObj.value.errorSentence = data.errSentence    
                    senteceObj.value.processJson = data.process_Json
                    selectedText.value.viewText = data.errSentence

                    senteceObj.value.error_type_near = 0
                    senteceObj.value.error_type_post = 0
                    senteceObj.value.error_type_pron = 0
                    senteceObj.value.error_type_cons = 0
                    senteceObj.value.error_type_spac = 0
                    senteceObj.value.error_type_mark = 0
                    senteceObj.value.error_type_etc = 0

                    xmlParse(data.errSentence)
                }

                if(result && result.data.message == 0){
                    senteceObj.value.id = ''
                    senteceObj.value.orgin_id = ''
                    senteceObj.value.corSentence = ''
                    senteceObj.value.errorSentence = ''
                    senteceObj.value.processJson = ''
                    selectedText.value.viewText = ''

                    xmlParse('')
                }


            }).catch(error => {
                console.log(error)
            })
        }

        onMounted(() => {
            getSentence()

            // hljs.highlightElement(document.querySelector('#xmlView'))
        })

        function xmlParse(errText){
            let errorSentenceArea = document.getElementById('errorSentenceArea')
            if(!errorSentenceArea) return
            // console.log(errText)
            let text = errorSentenceArea? errorSentenceArea.innerHTML : ''

            if(errText || errText === ''){
                selectedText.value.xmlData = errText === ''? '' : `<sentence>${errText}</sentence>`
                selectedText.value.viewXmlData =  errText === ''? '' : `<sentence>${errText}</sentence>`
                return
            }

            if(!text) {
                selectedText.value.xmlData = ''
                selectedText.value.viewXmlData = ''
                return 
            }

            let xml = `<sentence>${text}</sentence>`
            
            // <error$2</error><![CDATA[Line 1 <br />]]>
            xml = xml.replace(/(<span)(.+?)(<\s?\/\s?span>)/gi, '<error$2</error>')
            
            if (window.DOMParser){
                var parser = new DOMParser()
                var xmlDoc = parser.parseFromString(xml, "text/xml")
            }
            
            //console.log(xmlDoc.getElementsByTagName('error').removeAttribute('data-span-id'))

            let errorTag = xmlDoc.getElementsByTagName('error')

            for(let i = 0; i < errorTag.length; i++){
                errorTag[i].setAttribute('type', errorTag[i].getAttribute('data-error'))
                errorTag[i].removeAttribute('data-span-id')
                errorTag[i].removeAttribute('style')
                errorTag[i].removeAttribute('data-error')
            }

            selectedText.value.xmlData = new XMLSerializer().serializeToString(xmlDoc)

            /* 문법 하이라이트
            var xmlData = document.querySelector('#xmlData')
            var xmlView = document.querySelector('#xmlData')
            xmlView.innerHTML = xmlData.innerHTML
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            */

            selectedText.value.viewXmlData = selectedText.value.xmlData
            
            // string -> xml 
            // new DOMParser().parseFromString(selectedText.value.xmlData, 'text/xml')

            // console.log(selectedText.value.viewXmlData)
            // console.log(selectedText.value.xmlData)
        }

        function removeOneSpan(id){
            let errorSentenceArea = document.getElementById('errorSentenceArea'),
            span = document.querySelector(`[data-span-id='${id}']`)
            errorSentenceArea.innerHTML = errorSentenceArea.innerHTML.replace(span.outerHTML, span.textContent)
            
            let index = selectedText.value.button.findIndex(btn => btn.id == id)
            selectedText.value.button.splice(index, 1)

            xmlParse()
        }

        function onSubmitHandler(){
            // console.log('onSubmitHandler')
            const variable = {
                id: senteceObj.value.id,
                error_type_near: senteceObj.value.error_type_near,
                error_type_post: senteceObj.value.error_type_post,
                error_type_pron: senteceObj.value.error_type_pron,
                error_type_cons: senteceObj.value.error_type_cons,
                error_type_spac: senteceObj.value.error_type_spac,
                error_type_mark: senteceObj.value.error_type_mark,
                error_type_etc: senteceObj.value.error_type_etc
            }

            variable.processJson = JSON.stringify({xml: selectedText.value.xmlData})

            const res = submitProcessSentence(variable)

            res.then(result => {
                // console.log(result)
                if(result.data.message === 'success'){
                    getSentence()
                }
            }).catch(error => {
                console.log(error)
            })
        }

        return { 
            options,
            handleClick,
            optionClicked,
            vueSimpleContextMenu,
            senteceObj,
            selectedText,
            removeSpan,
            removeOneSpan,
            onSubmitHandler
        }
    }   
}
</script>

<style scoped>
.contents{
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

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