import express from 'express'
import {readFile} from 'fs'
import {fileURLToPath} from 'url'
import path from 'path'

const __fileUrl = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileUrl)

import getHtml from '../utils/filereader.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const html = await getHtml('./webpages/index.html')
    res.send(html)
})

router.get('/about', async (req, res) => {
    // const html = await getHtml('./webpages/about.html')
    // res.send(html)
    console.log('fileulr', __fileUrl)
    console.log('dirname', __dirName)
    res.sendFile(path.join(__dirName, '../webpages/about.html'))
})

router.use( async (req, res) => {
    const html = await getHtml('./webpages/pagenotfound.html')
    res.status(404).send(html)
})
export default router
