const request = require('request')


const foreCast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/19f25076f96dff3846f456b0659eab01/' + latitude + ',' + longitude
    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to Weather services', undefined)
        }else if ( response.body.error ) {
            callback('Wrong link.... Invalid Token', undefined)
        }else {
            // const latValue = body.latitude
            // const longValue = body.longitude
            // if (latValue === latitude && longValue === longitude) {
                callback(
                    undefined, response.body.daily.data[0].summary + '. It is currently ' + response.body.hourly.data[0].temperature + ' degrees out' +
                     '\n'  + 'Today the highest temperature is ' + response.body.daily.data[0].temperatureHigh + ' degress and lowest temperature is ' + response.body.daily.data[0].temperatureLow + ' degrees' 
                    )
        }
    }
    )

}


module.exports = {
    foreCast: foreCast
}