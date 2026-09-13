const express = require('express')
const fs = require('fs')

const app = express();

app.use('/test', (req, res, next) => {
    console.log('In a middleware')
    res.send('<h1>Inside test</h1>')
})

app.use('/test_two', (req, res, next) => {
    console.log('In a middleware')
    res.send('<h1>Inside test two</h1>')
})

app.use('/', (req, res, next) => {
    console.log('In a middleware')
})

app.listen(3000);
