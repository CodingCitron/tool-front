import instance from './index'

// A - 1
function getMegaData(){
	return instance.post('/works/get-mega-data')
}

function postMegaData(inputData) {
    return instance.post('/works/post-mega-data', inputData)
}
// A - 1

// A - 2
function getExpertData(){
    return instance.post(`/works/get-expert-data`)
}

function postExpertData(inputData){
    return instance.post(`/works/post-expert-data`, inputData)
}
// A - 2

// C 
function getProcessData(){
    return instance.post('/works/get-process-data')
}

function postProcessData(processData){
	return instance.post('/works/post-process-data', processData)
}
// C

/* not use */
function inputCsv(inputData) {
    return instance.post('/works/post-csv', inputData)
}

export { postMegaData, inputCsv, getExpertData, postExpertData, getProcessData, postProcessData, getMegaData }