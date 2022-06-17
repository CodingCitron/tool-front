import jwtDecode from 'jwt-decode'

function csvToJSON(csv){
    const rows = csv.trim().split('\r\n'),
    jsonArray = [],
    header = rows[0].split(',')
        
    for(let i = 0; i < rows.length; i++){
        let obj = {},
        row = rows[i].split(',')

        for(let j = 0; j < header.length; j++){
            obj[header[j]] = row[j]
        }

        jsonArray.push(obj)
    }

    return jsonArray
}

function availableToken(token){
    const { exp } = jwtDecode(token)
    if (Date.now() >= exp * 1000) return false
    return true
}

function copyObj(obj){ // 순환 참조에 사용하지 마세요.
    if(obj === null || typeof obj !== "object"){
        return obj
    }

    let copy = {}

    if(Array.isArray(obj)){
        copy = []
    }

    for (let key in obj){ //복사
        copy[key] = copyObj(obj[key])
    }

    return copy
}

/*
function getWesternAge(birth){
    console.log(birth.substring(0, 4), 
    birth.substring(4, 6), 
    birth.substring(6, 8))
    let birthday = new Date(
        birth.substring(0, 4), 
        birth.substring(4, 6), 
        birth.substring(6, 8)
        ),
    today = new Date(),
    thisYear = today.getFullYear(),
    birthYear = birthday.getFullYear(),
    yearAge = thisYear - birthYear,
    thisBirth = birthday.setFullYear(thisYear)	//올해의 생일 timestamp로 반환
    
    if(today.getTime() > thisBirth) yearAge--
    return yearAge
}
*/

function getWesternAge(birth) {
    var date = new Date(),
    year = date.getFullYear(),
    month = (date.getMonth() + 1),
    day = date.getDate()

    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day

    var monthDay = month + day
    birth = birth.replace('-', '').replace('-', '')

    var birthdayy = birth.substr(0, 4),
    birthdaymd = birth.substr(4, 4),
    age = monthDay < birthdaymd ? year - birthdayy - 1 : year - birthdayy

    return age
}

function renameKeys(mapping, objArr){
    const renamedObjArr = []

    for(let obj of objArr){
        const renamedObj = {}
        
        for(let [before, after] of Object.entries(mapping)){
            if(obj.hasOwnProperty(before)){
                renamedObj[after] = obj[before]
            }
        }

        renamedObjArr.push(renamedObj)
    }

    return renamedObjArr
}

function selectText() {
    var selectionText = '' //마우스로 드래그한 글
                 
    if (window.getSelection) {
        selectionText = window.getSelection()
    } else if (window.selection) {
        selectionText = window.selection.createRange().text
    }

    return selectionText
}

function selectRange(obj) {
    if (window.getSelection) {
        var selected = window.getSelection()
            selected.selectAllChildren(obj)
            
    } else if (document.body.createTextRange) {
        var range = document.body.createTextRange()
            range.moveToElementText(obj)
            range.select()
    }
}

function isMobile() {

    var user = navigator.userAgent
    var is_mobile = false
    
    if( user.indexOf("iPhone") > -1 
        || user.indexOf("Android") > -1 
        || user.indexOf("iPad") > -1
        || user.indexOf("iPod") > -1
    ) {
    
        is_mobile = true
        
    }
    
    return is_mobile
    
}

function Pagination(limit){
    this.start
    this.end 
    this.limit = limit
    this.pageSize
    this.nowPage = 1
    this.data = []
    this.nowData = []
    this.nowPagingBtn = []
    this.viewPageLength = 10
}

Pagination.prototype.calcProps = function(data, count){
    if(data) this.data = data
    const { limit, nowPage } = this
    
    if(this.data.length > limit){ // 데이터를 한번에 받아 페이징 처리 
        this.pageSize = Math.ceil(this.data.length / limit)
        this.start = Math.ceil(nowPage/limit) - 1
        this.end = Math.ceil(nowPage/limit) * limit

        this.nowData = this.data.slice((nowPage - 1) * limit, nowPage * limit)
        this.nowPagingBtn = this.pageSize < this.end ? 
        createNumArray(this.start + 1, this.pageSize + 1) :
        createNumArray(this.start + 1, this.end + 1)
        
        function createNumArray(start, end){
            let array = []

            for(let i = start; i < end; i++){
                array.push(i)
            }

            return array
        }

    } else { // count* required 
        // 전체 개수를 받아서 계산

    }
}

Pagination.prototype.setPage = function(page){
    this.nowPage = page
    this.calcProps()
}

Pagination.prototype.prev = function(page){
    console.log('prev')
}

Pagination.prototype.next = function(page){
    console.log('next')
}


export {
    csvToJSON,
    availableToken,
    copyObj,
    getWesternAge,
    renameKeys,
    selectText,
    selectRange,
    isMobile,
    Pagination
} 