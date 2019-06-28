const request=require('request')

const geocode = (address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?limit=2&access_token=pk.eyJ1IjoiaG9ncG9nIiwiYSI6ImNqeGNlN3lvbTAyNTgzbm1kNmc3YnBqb2oifQ.vhxveq9F68vCemmnU9Ge2A&limit=1'
    request({url, json:true},(error,{body}={})=>{
        if(error){
            callback('Cannot connet to the service right now',undefined)
        }else if(body.features.length===0){
            callback('Cannot find location, try another search.',undefined)
        }else{
        callback(undefined,{
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
    }
})
}

module.exports=geocode