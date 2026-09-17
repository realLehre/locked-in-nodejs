import http from 'http'
import {readFile, readFileSync} from 'fs'

const server = http.createServer((req, res) => {
    const url = req.url;

    switch (url) {
        case '/about':
            readHtml('./webpages/about.html', res)

            break
        case '/not-found':
            readHtml('./webpages/pagenotfound.html', res)

            break;
        default:
            readHtml('./webpages/index.html', res)
    }
})

const readHtml = (path, res) => {
    return readFile(path, 'utf-8', (error, data) => {
        res.write(data)
        res.end()
    })
}

server.listen(5000)
