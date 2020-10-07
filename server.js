const express = require('express');
const bodyParser= require('body-parser');
const axios= require('axios');
const ejs = require('ejs');
const { response } = require('express');
const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public')); 

app.set('view engine', ejs);
app.get('/', function(request, response){
    response.render("index.ejs", {country: ""});
});

app.post('/', (req, res) => {
    let country= req.body.country;
    let url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;

    console.log(country);
    axios.get(url) 
    .then(function(response){

        console.log(response.data);
        let countryObject = response.data[0];
        res.render("index.ejs", {country: countryObject})
        
    })
    .catch(function(error){
        console.log(error);
    });
});

app.listen(3000, ()=> {
    console.log('Server is running on port 3000');
});