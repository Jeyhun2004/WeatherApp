function renderHomePage(req, res) {
    res.render('home');
}

function renderWeatherPage(req, res, cityName, temperature, sunsetTime) {
    res.render('weather', {
        cityName: cityName,
        temperature: temperature,
        sunsetTime: sunsetTime
    });
}

function renderErrorPage(req, res, errorMessage) {
    res.render('error', { errorMessage });
}

module.exports = {
    renderHomePage,
    renderWeatherPage,
    renderErrorPage,
};
