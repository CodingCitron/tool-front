<template>
    <div class="wrap bg-light">
        <Sidebar @tabHandler="tabHandler" :tab="tab"/>
        <div class="contents">
            <div class="padding">
                <AddSentenceTab :view="nowView" :name="tab.AddSentenceTab.name" />
                <AddVoiceTab :view="nowView" :name="tab.AddVoiceTab.name" />
                <ManageWorkerTab :view="nowView" :name="tab.ManageWorker.name" />
                <StatisticsTab :view="nowView" :name="tab.StatisticsTab.name" />
                <SettingTab :view="nowView" :name="tab.SettingTab.name" />
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import Sidebar from '@/components/admin/Sidebar'
import AddSentenceTab from '@/components/admin/AddSentenceTab'
import ManageWorkerTab from '@/components/admin/ManageWorkerTab'
import AddVoiceTab from '@/components/admin/AddVoiceTab'
import StatisticsTab from '@/components/admin/StatisticsTab'
import SettingTab from '@/components/admin/SettingTab'

export default {
    components: {
        Sidebar,
        AddSentenceTab,
        AddVoiceTab,
        ManageWorkerTab,
        StatisticsTab,
        SettingTab
    },

    setup(){
        StatisticsTab
        const nowView = ref('AddSentenceTab'),
        tab = ref({
            AddSentenceTab: {
                auth: '',
                btnName: '문장 관리',
                name: 'AddSentenceTab'
            },
            AddVoiceTab: {
                auth: '',
                btnName: '음성 관리',
                name: 'AddVoiceTab'
            },
            ManageWorker: {
                auth: '',
                btnName: '작업자 관리',
                name: 'ManageWorkerTab'
            },
            StatisticsTab: {
                auth: '',
                btnName: '통계',
                name: 'StatisticsTab'
            },
            SettingTab: {
                auth: '',
                btnName: '설정',
                name: 'SettingTab'
            },
        }),
        router = useRouter()

        const tabHandler = e => {
            if(e.target.nodeName !== 'BUTTON') return
            if(nowView.value){
                nowView.value = ''
            }

            nowView.value = e.target.value
        }

        return {
            tabHandler,
            tab,
            nowView
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
    border: transparent;
}

.padding{
    padding: 0.5rem;
}
</style>