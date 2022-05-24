import axios from './index'

function scrape(inputData) {
    return axios.post('/works/scrape', inputData)
}

export { scrape }
