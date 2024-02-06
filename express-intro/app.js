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

app.listen(4000, () => {
    console.log("This app is listening on port 4000");
})