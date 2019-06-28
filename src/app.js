const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')
const path =require('path')
const express = require('express')
const hbs= require('hbs')

const app= express()
const port= process.env.PORT || 3000

//set up handlebars engine
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

//set up static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Kabir K'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Kabir K'
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title: 'Help!',
        name: 'Kabir K',
        message: 'This is a pretty simple app, just navigate to weather and enter your location.'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address.'
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, location}={})=>{
        if (error){
            return res.send({error})
        }else{
            forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }else{
                res.send({
                    location:location,
                    forecast:forecastData,
                    address:req.query.address
                })
                
            }
          })
        }
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404', {
        title: 'About me',
        message:'Help article not found',
        name: 'Kabir K'
    })
})

app.get('*',(req,res)=>{
    res.render('404', {
        title: 'About me',
        message:'Page not found',
        name: 'Kabir K'
    })
})


app.listen(port, ()=>{
    console.log('Server is up on '+port)
})