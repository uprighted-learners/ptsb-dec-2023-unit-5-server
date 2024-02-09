const express = require('express')
const app = express()

const PORT = 4000

app.get('/', (req, res) => {
    res.send('hello world')
})


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})