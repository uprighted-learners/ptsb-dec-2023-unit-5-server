const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()

const recipePath = path.join(__dirname, "../public/recipe.json")

const readFile = (path) => {
    // read file
    const file = fs.readFileSync(path)
    // parse into JS object
    return JSON.parse(file)
}

const writeFile = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data))
}

// Read
router.get('/all', (req, res) => {
    res.sendFile(recipePath)
})

// Read (get by id)
router.get('/:id', (req, res) => {
    // get all recipes as JS object
    const allRecipes = readFile(recipePath)
    // find the matching one
    const recipe = allRecipes.recipes.find(r => r.id == req.params.id)

    // TODO: add error handling for missing recipes
    res.send(recipe)
})

// Read (search by ingredient)
router.get('/ingredient/:ingredient', (req, res) => {
    const allRecipes = readFile(recipePath)
    const selection = allRecipes.recipes.filter(r => {
        return r.ingredients.includes(req.params.ingredient)
    })
    res.json(selection)
})

// Create
router.post('/add', (req, res) => {
    const allRecipes = readFile(recipePath)
    // add the new recipe to the JS object
    allRecipes.recipes.push(req.body)
    // write the updated JS objec to the JSON file
    writeFile(recipePath, allRecipes)
    // TODO: create id programmatically
    // TODO: add specific keys (title, author, ingredients) rather than use entire req.body

    res.send(`successfully added ${req.body.title}`)
})

// Update
router.put('/update/:id', (req, res) => {
    const allRecipes = readFile(recipePath)
    const recipe = allRecipes.recipes.find(r => r.id == req.params.id)
    // TODO: error handling for invalid id

    // merge data from request with existing recipe
    const newRecipe = Object.assign(recipe, req.body)

    console.log(req.body)
    console.log(newRecipe);

    // replace updated recipe
    const index = allRecipes.recipes.indexOf(recipe)
    if (index !== -1) {
        allRecipes.recipes[index] = newRecipe
    }

    writeFile(recipePath, allRecipes)
    res.send(`successfully updated ${newRecipe.title}`)
})

// Delete
router.delete('/delete/:id', (req, res) => {
    const allRecipes = readFile(recipePath)
    const recipe = allRecipes.recipes.find(r => r.id == req.params.id)

    // find the index of the recipe, remove it from the array
    const index = allRecipes.recipes.indexOf(recipe)
    if (index !== -1) {
        allRecipes.recipes.splice(index, 1)
    }

    writeFile(recipePath, allRecipes)
    res.send(`successfully deleted ${req.body.title}`)
})


// TODO: add a front end! 


module.exports = router