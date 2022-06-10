<template>
    <div :class="[props.view === props.name ? '' : 'hidden']">
        <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-1">
                <h3>수집 문장 추가하기</h3>
                <div class="d-flex gap-1">
                    <div>
                        
                    </div>
                    <button type="button" class="btn btn-primary" @click="errorLoadExcel">엑셀 파일 추가</button>
                </div>
            </div>
            <table class="table table-hover shadow-sm error-sentence">
                <thead>
                    <tr>
                        <th v-for="item in checkKey.errorText" :class="[item[1]? item[1] : '']">{{ item[0] }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in sentenceData" v-if="sentenceData">
                        <td>{{ index }}</td>
                        <td>{{ item.cor_sentence }}</td>
                        <td>{{ item.error_sentence }}</td>
                        <td>{{ item.error_type_near }}</td>
                        <td>{{ item.error_type_post }}</td>
                        <td>{{ item.error_type_pron }}</td>
                        <td>{{ item.error_type_cons }}</td>
                        <td>{{ item.error_type_spac }}</td>
                        <td>{{ item.error_type_mark }}</td>
                        <td>{{ item.error_type_etc }}</td>
                        <td>{{ item.meta_source }}</td>
                        <td>{{ item.meta_category }}</td>
                        <td>{{ item.meta_interface }}</td>
                        <td>{{ item.meta_keyboard }}</td>
                        <td>{{ item.meta_gender }}</td>
                        <td>{{ item.meta_age }}</td>
                    </tr>
                    <tr v-if="!sentenceData[0]" class="text-center">
                        <td colspan="17">입력된 데이터가 없습니다.</td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-end align-items-center gap-2">
                <div>
                    <select class="form-select" aria-label="Default select example" v-model="senteceGroupInfo">
                        <!-- <option selected value="">그룹 선택*</option> -->
                        <option value="megastudy">메가스터디</option>
                    </select>
                </div>
                <div>
                    <button type="button" class="btn btn-primary" @click="errorExcelSubmit">제출하기</button>
                </div>
            </div>
        </div>
        <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h3>교정 문장 추가하기</h3>
                <div class="d-flex gap-1">
                    <div>
                        
                    </div>
                    <button type="button" class="btn btn-primary" @click="corLoadExcel">엑셀 파일 추가</button>
                </div>
            </div>
            <div class="d-flex gap-2">
                <div class="width-50">
                    <div class="form-floating mb-3">
                        <textarea class="form-control noresize" placeholder="Leave a comment here" id="floatingTextarea2" v-model="corInputText"></textarea>
                        <label for="floatingTextarea2">교정 문장 추가하기</label>
                    </div>
                    <div class="d-flex justify-content-end align-items-center">
                        <div>
                            <button type="button" class="btn btn-primary" @click="colSentenceSubmit">제출하기</button>
                        </div>
                    </div>
                </div>
                <div class="width-50">
                    <table class="table table-hover shadow-sm cor-sentence">
                        <thead>
                            <tr>
                                <th v-for="item in checkKey.corText" :class="[item[1]? item[1] : '']">{{ item[0] }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in corSentenceData" v-if="corSentenceData">
                                <td>{{ index }}</td>
                                <td>{{ item.sentence }}</td>
                            </tr>
                            <tr v-if="!corSentenceData[0]" class="text-center">
                                <td colspan="2">입력된 데이터가 없습니다.</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-end align-items-center gap-2">
                        <div>
                            <select class="form-select" aria-label="Default select example" v-model="corSenteceGroupInfo">
                                <!-- <option selected value="">그룹 선택*</option> -->
                                <option value="expert">전문가</option>
                            </select>
                        </div>
                        <div>
                            <button type="button" class="btn btn-primary" @click="corExcelSubmit">제출하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h3>문장 관리</h3>
                <div class="d-flex gap-1">
                    <button type="button" class="btn btn-outline-primary" 
                    v-for="item in toggleButtonValue.button"
                    @click="(e) => toggleButton(e)" 
                    :value="item.value"
                    :class="[item.value === toggleButtonValue.now? 'active' : '']" >{{ item.name }}</button>
                </div>
            </div>
            <div>
                <table class="table table-hover shadow-sm sentence-manage">
                    <thead>
                        <tr>
                            <th v-for="item in getSentenceData.th[toggleButtonValue.now]">
                                {{ item }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(obj, index) in getSentenceData[toggleButtonValue.now]">
                            <td v-for="item in obj">{{ item }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-flex justify-content-center align-item-center">
                    <nav aria-label="...">
                        <ul class="pagination">
                            <li class="page-item disabled">
                                <a class="page-link">Previous</a>
                            </li>
                            <li class="page-item" 
                                v-for="item in paging.pageViewArray" 
                                :class="[paging.now === item ? 'active': '']"
                            >
                                <button class="page-link"  
                                    @click="paging.start(item)">
                                    {{ item }}
                                </button>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    <div>
        <input type="file" class="hidden" ref="errorFileElement" @change="errorExcelRead">
        <input type="file" class="hidden" ref="corFileElement" @change="corExcelRead">
    </div>
</template>

<script>
import { ref, watch } from 'vue'
import { read, writeFileXLSX, utils } from 'xlsx'
import { errExcel, addCorSentece, getSentence, getSentenceCount, corExcel } from '@/api/manage'
import { useStore } from 'vuex'
import { renameKeys } from '@/util' 

export default {
    props: {
        name: String,
        view: String
    },
    setup (props) {
        const errorFileElement = ref(''),
        corFileElement = ref(''),
        checkKey = ref({
            errorText: {
                id: ['번호'], /* 아이디 */
                cor_sentence: ['교정 문장'],
                error_sentence: ['수집 문장'],
                error_type_near: ['근접 오류'],
                error_type_post: ['조사 오류'],
                error_type_pron: ['유사 발음 오류'],
                error_type_cons: ['자음 동화 오류'],
                error_type_spac: ['띄어쓰기 오류'],
                error_type_mark: ['문장부호 오류'],
                error_type_etc: ['기타 오류'],
                meta_source: ['데이터 출처'],
                meta_category: ['오류 분류'],
                meta_interface: ['입력 장치'],
                meta_keyboard: ['입력 키보드'],
                meta_gender: ['성별'],
                meta_age: ['나이'],
                reg_date: ['데이터 생성일', 'hidden'],
            },
            audio: {
                id: '번호', /* 아이디 */
                origin_id: '외래키',
                audio_text: '변환된 어절',
                audio_start: '음성 시작 시간(초)',
                audio_end: '음성 종료 시간(초)',
                audio_url: '원본 영상 주소',
                meta_category: '오류 분류',
                meta_interface: '입력 장치',
                meta_keyboard: '입력 키보드',
                meta_gender: '성별',
                meta_age: '나이',
                reg_date: '데이터 생성일'
            },
            corText: {
                id: ['번호'],
                cor_sentence: ['교정 문장', 'width-80'],
            },
        }),
        sentenceData = ref([]),
        senteceGroupInfo = ref('megastudy'),
        corSentenceData = ref([]),
        corSenteceGroupInfo = ref('expert'),
        corInputText = ref('')

        const getSentenceData = ref({
            correction: [],
            error: [],
            mix: [],
            defaultValue: 'correction',
            th: {
                correction: [],
                error: [],
                mix: [],
            }
        })

        const toggleButtonValue = ref({
            button: [
                {
                    value: 'correction',
                    name: '교정'
                },
                {
                    value: 'error',
                    name: '수집'
                },
                {
                    value: 'mix',
                    name: '혼합'
                }
            ],
            now: getSentenceData.value.defaultValue
        })

        const toggleButton = e => {
            toggleButtonValue.value.now = e.target.value
            paging.value.nowView = e.target.value
        }

        watch(toggleButtonValue.value, () => {
            paging.value.start(1)
        })

        const paging = ref({
            start: function(page){
                const { total, limit, nowView } = paging.value, 
                start = (page - 1) * limit

                if(start < 0){
                    start = 1
                }

                getSentenceData.value.correction = [],
                getSentenceData.value.error = [],
                getSentenceData.value.mix = []

                const res = getSentence({ type: nowView, start: start, limit: limit })

                    res.then(result => {
                        console.log(result)

                    result.data.data = renameKeys(renamedObj, result.data.data)

                    getSentenceData.value.th[nowView] = Object.keys(result.data.data[0])
                    getSentenceData.value[nowView].push(...dataSort(result))
                    paging.value.total[nowView] = result.data.count
                    paging.value.calcPage() 
                    paging.value.calcLength()
                    paging.value.now = page
                }).catch(error => {
                    console.log(error)
                })
            },
            now: 1, 
            total: {
                correction: 0, 
                error: 0,
                mix: 0
            },
            limit: 10,
            page: 0,
            calcPage: function(){
                const { total, limit, nowView } = paging.value 
                paging.value.page = Math.ceil(total[nowView] / limit)
            },
            length: 10,
            pageViewArray: [],
            calcLength: function(){
                paging.value.pageViewArray = []

                const { now, page, length, limit } = paging.value,
                pageStart = Math.ceil(now / limit),
                pageEnd = Math.ceil(now / limit) * limit,
                thisPagelength = page < pageEnd ? page : pageEnd,
                array = []

                for(let i = pageStart; i <= thisPagelength; i++){
                    array.push(i)
                }

                paging.value.pageViewArray = array
            },
            nowView: 'correction'
        })

        const store = useStore(),
        user = store.getters['user/GET_USER_INFO']
        
        paging.value.start(1)

        function dataSort(result){
            for(var i = 0; i < result.data.data.length; i++){
                for(var prop in result.data.data[i]){
                    result.data.data[i][prop] = result.data.data[i][prop] === null? '빈 값' : result.data.data[i][prop]
                }
            }

            return result.data.data
        }

        const renamedObj = {
            id: '번호',
            sentence: '문장',
            origin_id: '교정 문장 번호',
            worker: '작업자',
            registrant: '등록자',
            status: '상태',
            error_type_near: '근접 오류',
            error_type_post: '조사 오류',
            error_type_pron: '유사 발음 오류',
            error_type_cons: '자음 동화 오류',
            error_type_spac: '띄어쓰기 오류',
            error_type_mark: '문장 부호 오류',
            error_type_etc: '기타 오류',
            meta_source: '데이터 출처',
            meta_category: '오류 분류',
            meta_interface: '입력 장치',
            meta_keyboard: '입려 키보드',
            meta_gender: '성별',
            meta_age: '나이',
            reg_date: '등록일',
            modify_date: '수정일',
            group_name: '그룹'
        } 

        const errorExcelRead = (e) => {
            var input = event.target,
            reader = new FileReader()        

            reader.onload = function() {
                var fileData = reader.result,
                wb = read(fileData, {type : 'binary'})

                wb.SheetNames.forEach(function(sheetName, index){
                    var rowObj = utils.sheet_to_json(wb.Sheets[sheetName])

                    sentenceData.value.push(...rowObj)
                })

                for(var prop in sentenceData.value[0]) {
                    if(!(prop in checkKey.value.errorText)) {
                        sentenceData.value = []
                        alert('데이터 형식이 틀립니다.')
                        return 
                    }
                }

                console.log(sentenceData.value)
            }
                
            reader.readAsBinaryString(input.files[0])
        }

        const errorExcelSubmit = () => {
            var variable = {
                group: senteceGroupInfo.value,
                data: sentenceData.value
            }

            if(variable.group === ''){
               return alert('그룹을 선택하세요.')
            }

            if(sentenceData.value.length === 0){
                return alert('데이터를 입력하세요.')
            }

            const res = errExcel(variable)
            res.then(result => {
                console.log(result)
            }).catch(error => {
                console.log(error)
            })
        }

        const corExcelRead = (e) => {
            var input = event.target,
            reader = new FileReader()        

            reader.onload = function() {
                var fileData = reader.result,
                wb = read(fileData, {type : 'binary'})

                wb.SheetNames.forEach(function(sheetName, index){
                    var rowObj = utils.sheet_to_json(wb.Sheets[sheetName])
                    corSentenceData.value.push(...rowObj)
                })
                
                for(var prop in corSentenceData.value[0]) {
                    if(prop !== 'sentence') {
                        corSentenceData.value = []
                        return alert('데이터 형식이 틀립니다.')
                    }
                }
            }
                
            reader.readAsBinaryString(input.files[0])
        }

        const colSentenceSubmit = () => {
            if(corInputText.value === '') return alert('입력된 값이 없습니다.')
            
            var variable = {
                id: user.userId,
                sentence: corInputText.value,
                group: 'expert'
            }

            const res = addCorSentece(variable)
            res.then(result => {
                alert('문장을 추가했습니다.')
                corInputText.value = ''
            }).catch(error => {
                alert('문장을 추가하지 못했습니다.')
            })
        }

        const errorLoadExcel = () => {
            errorFileElement.value.click()
        }

        const corLoadExcel = () => {
            corFileElement.value.click()
        }

        const corExcelSubmit = () => {
            if(corSentenceData.value.length === 0) return alert('입력된 문장이 없습니다.')

            const variable = {
                id: user.userId,
                group: 'expert',
                data: corSentenceData.value
            }

            const res = corExcel(variable)
            res.then(result => {
                console.log(result)
            }).catch(error => {
                console.log(error)
            })
        }

        return {
            errorLoadExcel,
            corLoadExcel,
            errorFileElement,
            corFileElement,
            errorExcelRead,
            corExcelRead,
            checkKey,
            sentenceData,
            props,
            errorExcelSubmit,
            senteceGroupInfo,
            corSentenceData,
            corSenteceGroupInfo,
            colSentenceSubmit,
            corInputText,
            getSentenceData,
            toggleButton,
            toggleButtonValue,
            corExcelSubmit,
            paging
        }
    }
}
</script>

<style scoped>
table{
    min-height: 100px;
    background: #fff;
    text-align: center;
}

.table > :not(:first-child) {
    border-top: transparent;
}

th{
    min-width: 50px;
    font-size: 14px;
    font-weight: 500;
}

td{
    vertical-align: middle;
}

.error-sentence td:nth-child(2),
.error-sentence td:nth-child(3),
.error-sentence th:nth-child(2),
.error-sentence th:nth-child(3){
    max-width: 250px;
}

.cor-sentence td:nth-child(2),
.error-sentence td:nth-child(2),
.error-sentence td:nth-child(3){
    text-align: left;
}

.sentence-manage td{
    max-width: 250px;
}

.sentence-manage td:nth-child(2){
    text-align: left;
}

select{
    height: 35px;
    font-size: 14px;
}

textarea{
    min-height: 100px;
}

</style>