import instance from './index'

function scrape(inputData) {
    return instance.post('/works/scrape', inputData)
}

export { scrape }
