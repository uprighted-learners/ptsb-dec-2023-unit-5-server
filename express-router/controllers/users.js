const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('hello world')
})

router.post('/add', (req, res) => {
    res.send('post successful')
})

router.put('/update', (req, res) => {
    res.send('update successful')
})

router.delete('/delete', (req, res) => {
    res.send('delete successful')
})

module.exports = router