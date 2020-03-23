const request = require('request')

// Getting the latitude and longitude of a place using geocode
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidHVrZWkiLCJhIjoiY2s3bnM1anNhMDI0NDNkbjEzMjFkdG84ZCJ9.NC9kE0ky3kRRSkIw22R2Cw'
    request({ url, json:true }, ( error, { body } ) => {
        if (error) {
            callback('Unable to connect to Weather services')
        }else if (body.features.length === 0) { // When there is an error on link or empty link given
            callback('Unable to find location')
         }else {

            // Set values to variables or objects can work for both
            // const latitude = response.body.features[0].center[1]
            // const longitude = response.body.features[0].center[0]
            // const placeName = response.body.features[0].place_name
            // callback(undefined, 'The latitude is: ' + latitude + ' and Longitude is ' + longitude + ' and the placename ' + placeName)
            
           // Setting values to objects
            callback(undefined, {
                latitude:  body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })

        }
    })
}


module.exports = {
    geocode: geocode
}