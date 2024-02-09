const express = require('express')
const app = express()

const PORT = 4000



// ! Middleware
// these functions will be used as middlewares
const logTime = (req, res, next) => {
    console.log(`This request was logged at: ${new Date().toLocaleTimeString()}`);
    // next is the next function in the call stack
    next()
}

const logBeansTime = (req, res, next) => {
    console.log(`Beans-based request was logged at: ${new Date().toLocaleTimeString()}`);
    next()
}

// middlewares intervene in the call stack
// they inject logic of our choice into the request-response lifecycle
app.use(logTime)
// the optional path parameter applies the callback only to matching routes
app.use('/beans', logBeansTime)

// app.get('/', (req, res) => {
//     res.send(`This is port ${PORT}`)
// })

// these routes will have the beans middleware applies, because they match the path
app.get('/beans', (req, res) => {
    res.send(`I love beans`)
})

app.get('/beans/are/great', (req, res) => {
    res.send(`I love beans soooo much`)
})


// ! Serving Files

const path = require('path')

// put this at the top of the file
// this serves everything in the static folder 
// to a route matching the filename
app.use(express.static("static"))

// OR (or in addition) serve files to a route using res.sendFile
app.get('/two', (req, res) => {
    res.sendFile(__dirname + '/static/page2.html')
    // res.sendFile(`${__dirname}/static/page2.html`)
    // res.sendFile(path.join(__dirname, '/static/page2.html'))
})

app.listen(PORT, () => {
    console.log(`This app is listening on port ${PORT}`);
})