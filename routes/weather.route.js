const express = require('express');
const router = express.Router();


const { getWeatherData, airPolutionData} = require('../controllers/weather.controller');



router.get('/weather-data', getWeatherData);
router.get('/airpollution-data', airPolutionData);


module.exports = router