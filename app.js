import os from 'os'
import {readFileSync} from 'fs'
import {PDFParse} from 'pdf-parse'


async function run() {
    const parse = new PDFParse({url:'the_cold_war.pdf'})
    const result  = await parse.getInfo()
    console.log(result)
}

run()
