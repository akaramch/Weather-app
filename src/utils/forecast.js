const request=require('request')

const forecast= (latitude, longitude, callback)=>{

const url = 'https://api.darksky.net/forecast/0a6c87f2eb8673ce4025e55501dad9c6/'+latitude+','+longitude

request({url, json:true},(error,{body})=>{
    if(error){
        callback('Cannot connet to the service right now', undefined)
    }else if(body.error){
        callback('Cannot find location.', undefined)
    }else{
        callback(undefined,'It is currently '+body.currently.temperature+' degrees out. There is a '+ body.currently.precipProbability+'% chance of precipitation.')
}
})
}

module.exports=forecast