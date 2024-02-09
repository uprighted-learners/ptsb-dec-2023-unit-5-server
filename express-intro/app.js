const express = require('express')
const app = express()

// localhost:4000/
app.get('/', (req, res) => {
    res.send('Hello world!!!')
})

// localhost:4000/beans
app.get('/beans', (req, res) => {
    res.send('I love beans')
})

app.get('/hello', (req, res) => {
    res.send(`This is port 3000`)
})

app.listen(3000, () => {
    console.log("This app is listening on port 3000");
})