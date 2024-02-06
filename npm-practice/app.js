const cow = require('cowsay')

const says = cow.think({
    text: "I love beans",
    e: "oO",
    T: 'U',
    f: 'minotaur'
})

console.log(says);

// function get_cows(error, cow_names) {
//     if (error) {
//         console.log(error)
//     }
//     else if (cow_names) {
//         console.log(`Number of cows available: ${cow_names.length}`);
//         console.log(cow_names);
//     }
// }

// cow.list(get_cows);