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

export {
    csvToJSON,
    availableToken
} 