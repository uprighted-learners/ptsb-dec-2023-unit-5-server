const express = require('express')
const fs = require('fs')

const app = express()
const PORT = 4000
const bookPath = __dirname + "/static/books.json"

// middleware that allows us to interpret request bodies as JSON
app.use(express.json())

app.get('/books', (req, res) => {
    // send an entire file as the response
    // in this case, our JSON database file
    res.sendFile(bookPath)
})

app.get('/books/:bookId', (req, res) => {
    // HTTP GET is for retrieving information from the server to the client

    // read file
    const data = fs.readFileSync(bookPath)
    // parse JSON into JS object
    const parsedData = JSON.parse(data)
    // find the book with the id we're looking for
    const foundBook = parsedData.books.filter(b => b.id == req.params.bookId)

    // either send the book or send an error
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

app.post('/books/add', (req, res) => {
    // HTTP POST is for sending information from client to server

    // to save the data....
    // open/read the json file
    const data = fs.readFileSync(bookPath)
    // parse it into an object we can update
    const parsedData = JSON.parse(data)
    // add the new entry
    parsedData.books.push(req.body)
    // save it to file
    fs.writeFileSync(bookPath, JSON.stringify(parsedData))

    res.send("new book successfully added")
})

app.put('/books/update/:bookId', (req, res) => {
    // HTTP POST is also for sending information from client to server
    // PUT requests should be idempotent
    // idempotency means that performing the operation repeatedly
    // will not result in duplicated data
    // it will only make a change if there is a change to make

    // open/read the json file
    const data = fs.readFileSync(bookPath)
    // parse it into an object we can update
    const parsedData = JSON.parse(data)
    // check whether the data in the request body already exists
    // in this case, we'll look for a matching id
    const foundBook = parsedData.books.filter(b => b.id == req.params.bookId)

    if (foundBook.length === 0) {
        // add the new entry
        parsedData.books.push(req.body)
        // save it to file
        fs.writeFileSync(bookPath, JSON.stringify(parsedData))
    } else if (foundBook.length > 1) {
        res.status(500)
        res.send('invalid data')
    } else {
        const newBook = Object.assign(foundBook[0], req.body)
        // find and replace the original entry in the array
        let i = parsedData.books.indexOf(foundBook[0])
        if (i !== -1) {
            parsedData.books[i] = newBook
        }
        fs.writeFileSync(bookPath, JSON.stringify(parsedData))
    }
    res.send('book successfully updated')
})


app.delete('/books/delete/:bookId', (req, res) => {
    const data = fs.readFileSync(bookPath)
    const parsedData = JSON.parse(data)
    const foundBook = parsedData.books.filter(b => b.id == req.params.bookId)

    if (foundBook.length === 0) {
        res.send('that book does not exist')
    } else if (foundBook.length > 1) {
        res.status(500)
        res.send('invalid data')
    } else {
        let i = parsedData.books.indexOf(foundBook[0])
        if (i !== -1) {
            parsedData.books.splice(i, 1)
        }
        fs.writeFileSync(bookPath, JSON.stringify(parsedData))
    }
    res.send('book successfully deleted')
})


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})