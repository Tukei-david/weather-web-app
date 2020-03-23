// Handlebars are used and reuse various part of our section in our apps
console.log('Script page loaded')

// Fetch is used to fetch dat from inside javascript to cliten sidde javascript
// Fetch API
// fetch('http://puzzle.mead.io/puzzle').then( (response) => {

//     // Will run when JSON data is arrived and been parsed
//     // Will render the result to the broswer
//     response.json().then( (data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather/?address=Boston').then( (response) => {
    
//     response.json().then( (data) => {
//         if (data.error) {
//             return console.log(data.error)
//         }else {
//             console.log(
//                 data.forecast,
//                 data.location,
//                 data.address)
//         }
        
//     })
    
// })



const weatherForm = document.querySelector('form')
const inputValue = document.querySelector('input')
const errorMessage = document.querySelector('#error-message')
const successMessage = document.querySelector('#success-message')

// textContent is used to set content on elements
// errorMessage.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = inputValue.value
    errorMessage.textContent = 'Loading...'
    successMessage.textContent = ' '
    
    fetch('http://localhost:3000/weather/?address=' + location  ).then( (response) => {
        response.json().then( (data) => {
            if (data.error) {
                return errorMessage.textContent = data.error
                // return console.log(data.error)
            }else {
                errorMessage.textContent = data.forecast
                successMessage.textContent = data.address
                // console.log(
                //     data.forecast,
                //     data.location,
                //     data.address)
            }
        })
    })
})