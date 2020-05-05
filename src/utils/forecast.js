const request = require('request');

const forecast = (latitude,longitude,callback) =>{
    const url = "https://api.darksky.net/forecast/3a2a7e09434edfafc02ce93f53a947c9/" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude)
    
    request({url, json: true}, (error, {body}) =>{
        if (error) {
            callback('Unable to connect to weather service',undefined)
        } else if (body.error) {
            callback('unable to find location',undefined)
        } else{
            callback(undefined,body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain." +" The Tempature high today will be "+body.daily.data[0].temperatureMax+" degrees. The tempature low for the day will be " +body.daily.data[0].temperatureMin + " degress.")
        }
    })
}

module.exports = forecast;