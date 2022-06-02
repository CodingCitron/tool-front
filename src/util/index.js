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

export {
    csvToJSON,
    availableToken,
    copyObj,
    getWesternAge
} 