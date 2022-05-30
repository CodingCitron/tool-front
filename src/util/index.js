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

function copyObj(obj){
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

function getWesternAge(birthday){
    let today = new Date()
    let thisYear = today.getFullYear()
    let birthYear = birthday.getFullYear()
    let yearAge = thisYear - birthYear
    let thisBirth = birthday.setFullYear(thisYear)	//올해의 생일 timestamp로 반환
    
    if(today.getTime() > thisBirth) yearAge--
    return yearAge
}

export {
    csvToJSON,
    availableToken,
    copyObj,
    getWesternAge
} 