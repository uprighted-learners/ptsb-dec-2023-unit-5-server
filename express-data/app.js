const express = require('express')
const fs = require('fs')

const app = express()
const PORT = 4000
const bookPath = __dirname + "/static/books.json"

// app.use(express.urlencoded({ extended: true }))

app.get('/books', (req, res) => {
    res.sendFile(bookPath)
})

app.get('/books/:bookId', (req, res) => {
    const data = fs.readFileSync(bookPath)
    const parsedData = JSON.parse(data)
    const foundBook = parsedData.books.filter(b => b.id == req.params.bookId)

    if (foundBook.length === 0) {
        res.status(404)
        res.send('404: that book does not exist')
    } else if (foundBook.length > 1) {
        res.status(500)
        res.send('invalid data')
    } else {
        res.send(foundBook[0])
    }
})

app.use(express.json())
app.post('/books/add', (req, res) => {
    const data = fs.readFileSync(bookPath)
    const parsedData = JSON.parse(data)

    newId = parsedData.books[parsedData.books.length - 1].id

    const newBook = req.body
    newBook.id = newId

    parsedData.books.push(newBook)
    res.send(parsedData)

    fs.writeFileSync(bookPath, JSON.stringify(parsedData))
})

app.put('/books/update/:bookId', (req, res) => {
    const data = fs.readFileSync(bookPath)
    const parsedData = JSON.parse(data)
    const foundBook = parsedData.books.filter(b => b.id == req.params.bookId)
    // TODO: how to update a JS object?

})


// if we were going to keep developing this...
// TODO: add endpoint to search by author name string
// TODO: add POST and DELETE and PUT endpoints

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})