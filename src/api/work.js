import instance from './index'

// A - 1 pageType Boolean
function getMegaData(pageType){
	return instance.post('/works/get-mega-data', pageType)
}

function postMegaData(inputData) {
    return instance.post('/works/post-mega-data', inputData)
}
// A - 1

// A - 2
function getExpertData(pageType){
    return instance.post(`/works/get-expert-data`, pageType)
}

function postExpertData(inputData){
    return instance.post(`/works/post-expert-data`, inputData)
}

function getProcessExpertData(){
    return instance.post('/works/get-process-expert-data')
}

function postProcessExpertData(sentence){
    return instance.post('/works/post-process-expert-data', sentence)
}
// A - 2

// C 
function getProcessData(pageType){
    return instance.post('/works/get-process-data', pageType)
}

function postProcessData(processData){
	return instance.post('/works/post-process-data', processData)
}
// C

/* not use */
function inputCsv(inputData) {
    return instance.post('/works/post-csv', inputData)
}

export { postMegaData, inputCsv, getExpertData, postExpertData, getProcessData, postProcessData, getMegaData, getProcessExpertData, postProcessExpertData }