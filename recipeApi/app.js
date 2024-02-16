const express = require('express')
const app = express()
const PORT = 4000

const routes = require('./controllers/recipe')

// middleware that serves static files
// by default, serves them to the root of the server ('/')
app.use(express.static('public'))

// middleware that allows us to interpret request bodies as JSON
app.use(express.json())
app.use('/', routes)

app.listen(PORT, () => console.log(`listening on port ${PORT}`))