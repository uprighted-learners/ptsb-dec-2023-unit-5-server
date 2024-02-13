const express = require('express')
const app = express()
const PORT = 4000

const userRoutes = require('./controllers/users')
const dataRoutes = require('./controllers/data-app')

app.use('/users', userRoutes)
app.use('/data', dataRoutes)


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})