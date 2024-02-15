const express = require('express')
const app = express()
const PORT = 4000

const routes = require('./controllers/recipe')

// middleware that allows us to interpret request bodies as JSON
app.use(express.json())
app.use('/', routes)

app.listen(PORT, () => console.log(`listening on port ${PORT}`))