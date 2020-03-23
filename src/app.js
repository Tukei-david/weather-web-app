const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocodePath = require('./utils/geocode')
const forecastPath = require('./utils/forecast')


//We use habdlebars npm modules to link same header and footers in every page of our app.
// We use it short form.. hbs becouse of express module
const app = express()
// For viewing in heroku .. We want to access enviroment viables
const port = process.env.PORT || 3000

// Store your page in a variable
const homePageDirectory = path.join(__dirname, '../public' )
const viewPath = path.join(__dirname, '../templates/views' )
const partialsPath = path.join(__dirname, '../templates/partials')
// const aboutPageFile = path.join(_filename)

// set() is used to import handlerbrs or set methods on your app
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath) // Registering path for partials


// Order to use the directory page
app.use(express.static(homePageDirectory))

// To view the handlebars you need to set the route
app.get('', (req, res) => {
    //First argument contains the value you want to render
    // Second argument contains the object that has values which the view will be to acces it
    res.render('index', {
        title: 'Weather App',
        name: 'Tukei David'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me ',
        name: 'Tukei David'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Press here to return home page'
    })
})



app.get('/weather', (req, res) => {
if (!req.query.address) {
    return res.send ({
        error: 'Please enter your address'        
    })
}

geocodePath.geocode( req.query.address, (error, { latitude, longitude, location } = {} ) => {
    if (error) {
        return res.send({ error })
    }
    forecastPath.foreCast(latitude, longitude, (error, data ) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            forecast: data,
            location,
            address: req.query.address

        })
        
    })
}) 

// res.send()
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search teram'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tukei David',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error Page',
        name: 'Tukei David',
        errorMessage: 'Page not found'
    })
})

































// configure whta the should when it gets response from user
// Object req--- Contain information about incoming request from the server
// Object res--- Allows us to respond to the data
// app.get( '', (req, res) => {
//     // Send the string to the browser
//     res.send(
//         '<h1>Home Page content</h1> <p>Distinctively leverage existing standardized meta-services and resource-leveling networks. Proactively engineer seamless strategic theme areas.</p>')
// })

// app.get('/help', (req, res) => {
//     console.log(path.join(_filename, + '../public'))

// })

// app.get('/error', (req, res) => {
//     res.send('<h1>Error Page content</h1> <p>Distinctively leverage existing standardized meta-services and resource-leveling networks. Proactively engineer seamless strategic theme areas.</p>')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page content</h1> <p>Distinctively leverage existing standardized meta-services and resource-leveling networks. Proactively engineer seamless strategic theme areas.</p>')
// })

// That app will start by listenig to the default webdeveloper port
app.listen(port, () => {
    console.log('server is up on port ' + port)
})