import {readFile} from 'fs'

console.log('started')
readFile('./file/test.txt', 'utf8',(err, data) => {
    if(err) {
        console.log('error', err)
        return;
    }
    console.log('file data', data)
    console.log('done reading file')
})
console.log('ended')
