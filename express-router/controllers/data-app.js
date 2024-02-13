const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('here\'s some data')
})

router.post('/add', (req, res) => {
    res.send('data post successful')
})

router.put('/update', (req, res) => {
    res.send('data update successful')
})

router.delete('/delete', (req, res) => {
    res.send('data delete successful')
})


module.exports = router