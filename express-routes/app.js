/* 
    ? How to start a new Express project
    * make a new directory, cd into it
    * `touch app.js` to make a new file
    * run `npm init -y` to initialize npm project with default values
    * `npm install express`
    * change package.json "main" to app.js (or whatever we named our js file)
    * add a "start" script: 'node app.js' (or whatever we named our js file)
    * add a "dev" script: 'nodemon'
    * if it's a git project, add a .gitignore file
        * node_modules
*/


const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))

// '/' is the root directory
// localhost:4000/
app.get('/', (req, res) => {
    res.send('hello')
})

// the first argument is the path, everything following the host:port:
// localhost:4000/beans/are/great
app.get('/beans/are/great', (req, res) => {
    res.send('hello beans')
})

// always prefix variable routes that use parameters
//      with something static (and hopefully descriptive)
// localhost:4000/person/Danny/Burrow
app.get('/person/:firstName/:lastName', (req, res) => {
    console.log(req.params);
    res.send(`Nice to meet you, ${req.params.firstName} ${req.params.lastName}!`)
})

//localhost:4000/person/?first=Danny&last=Burrow
app.get('/person', (req, res) => {
    console.log(req.query);
    res.send(`Nice to see you again, ${req.query.first} ${req.query.last}!`)
})


// this line tells the function to parse the request body as JSON
app.use(express.json())
// we can re-use paths with different HTTP methods
app.post('/person', (req, res) => {
    console.log(req.body);
    res.send(`There you are again, ${req.body.first} ${req.body.last}`)
})

// we can serve HTML as a response, the browser will interpret it
app.get('/input', (req, res) => {
    res.send(`
        <form method="post" action="/person">
            <input type="text" name="first" >
            <input type="text" name="last" >
            <button type="submit">Click me</button>
        </form>
    `)
})

app.get('/color', (req, res) => {
    // when we hit this endpoint with a color hex code as a query parameter
    // the background color is set to that hex code
    res.send(`
        <body style="background-color:${req.query.color}">
            <form method="get" action="/color?${req.query.color}">
                <input type="color" name="color" >
                <button type="submit">Click me</button>
            </form>
        </body>
    `)
})

app.listen(4000, () => {
    console.log("listening on port 4000");
})