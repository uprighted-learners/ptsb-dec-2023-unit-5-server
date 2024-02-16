const searchButton = document.getElementById('search-button')
const searchInput = document.getElementById('ingredient')
const recipeBox = document.getElementById('recipes')

searchButton.addEventListener("click", e => {
    searchIngredients(searchInput.value)
})

const searchIngredients = async (ingredient) => {
    recipeBox.innerHTML = ''
    await fetch(`http://localhost:4000/ingredient/${ingredient}`)
        .then(res => res.json())
        .then(data => data.forEach(r => createCard(r)))
    // TODO: add error handling for no results
}

const createCard = (recipe) => {
    const card = document.createElement('div')
    card.classList.add('card')

    const title = document.createElement('h3')
    title.innerText = recipe.title

    const rating = document.createElement('span')
    if (recipe.rating) {
        const rateNum = Number(recipe.rating)
        const _ = [...Array(rateNum)].forEach(() => rating.innerText += "⭐")
    }

    card.addEventListener('click', e => {
        expandCard(card, recipe)
    })

    card.appendChild(title)
    card.appendChild(rating)
    recipeBox.appendChild(card)
}

const expandCard = (card, recipe) => {
    // close if already open
    const currentWrapper = card.querySelector(`.card-${recipe.id}`)
    if (currentWrapper) {
        currentWrapper.remove()
    } else {
        const wrapper = document.createElement('div')
        wrapper.classList.add(`card-${recipe.id}`)

        const ingredientsList = document.createElement('ul')

        recipe.ingredients.forEach(ing => {
            const line = document.createElement('li')
            line.innerText = ing
            ingredientsList.appendChild(line)
        })

        wrapper.appendChild(ingredientsList)

        // add rating input
        const rate = document.createElement('input')
        rate.setAttribute('type', 'number')
        rate.setAttribute('min', '1')
        rate.setAttribute('max', '5')
        rate.addEventListener('click', e => e.stopPropagation())
        const submit = document.createElement('button')
        submit.innerText = 'Rate this recipe'
        submit.addEventListener('click', e => {
            rateRecipe(e, recipe.id, rate.value)
        })

        wrapper.appendChild(rate)
        wrapper.appendChild(submit)
        card.appendChild(wrapper)
    }
}

const rateRecipe = async (event, recipeId, value) => {
    event.stopPropagation()

    const rating = { rating: value }
    const url = `http://localhost:4000/update/${recipeId}`

    await fetch(url, {
        method: "PUT",
        body: JSON.stringify(rating),
        headers: { "Content-Type": "application/json" },
    }).then(res => res.json())
        .then(data => console.log(data))
}