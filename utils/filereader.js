import {readFile} from 'fs/promises'

const getHtml = async (path) => {
    return await readFile(path, 'utf-8')
}

export default getHtml
