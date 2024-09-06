const express = require('express');
const axios = require('axios');
require('dotenv').config();
const { renderHomePage, renderWeatherPage, renderErrorPage } = require('./views');

const app = express();

const API_KEY = process.env.API_KEY;
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    renderHomePage(req, res);
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.status(400).send('Please provide an address');
    }

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`;

    axios.get(url).then(response => {
        const data = response.data;
        const cityName = data.name;
        const temperature = data.main.temp;
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        
        renderWeatherPage(req, res, cityName, temperature, sunsetTime);
    })
    .catch(error => {
        console.error(error);
        const errorMessage = error.response ? error.response.data.message : 'An error occurred while fetching the weather data. Please try again.';
        renderErrorPage(req, res, errorMessage);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
