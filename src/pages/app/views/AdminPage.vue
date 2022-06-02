<template>
    <div class="wrap">
        <Sidebar @addSentence="addSentenceHandler" />
        <div class="contents">
            <div class="padding">
                <AddSentenceTab v-if="tab.sentenceTab" />
            </div>
        </div>
    </div>
    <div>
        <input type="file" class="hidden" ref="fileElement" @change="excelRead">
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { read, writeFileXLSX, utils } from "xlsx"

import Sidebar from '@/components/admin/Sidebar'
import AddSentenceTab from '@/components/admin/AddSentenceTab'

export default {
    components: {
        Sidebar,
        AddSentenceTab
    },

    setup(){
        const fileElement = ref(''), 
        tab = ref({
            sentenceTab: false
        }),
        router = useRouter()

        const addSentenceHandler = () => {
            console.log('addSentenceHandler')
            tab.value.sentenceTab = !tab.value.sentenceTab
            console.log(tab.value.sentenceTab)
            //fileElement.value.click()
        }

        const excelRead = (e) => {
            var input = event.target,
            reader = new FileReader()        

            reader.onload = function() {
                var fileData = reader.result
                var wb = read(fileData, {type : 'binary'})

                wb.SheetNames.forEach(function(sheetName){
                    var rowObj = utils.sheet_to_json(wb.Sheets[sheetName])
                    console.log(rowObj)
                })

            }
                
            reader.readAsBinaryString(input.files[0])
        }

        return {
            fileElement,
            addSentenceHandler,
            excelRead,
            tab
        }
    }
}
</script>

<style scoped>
.wrap{
    min-height: calc(100vh - 135px);
    width: 100%;
}

.contents{
    width: 100%;
    padding-left: 240px;
}

.padding{
    padding: 0.5rem;
}
</style>