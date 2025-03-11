const axios = require('axios');





const getWeatherData = async(req, res)=>{
    try
    {
        const {lat, lon} = req.body;
        if(!lat || !lon)
        {
            return res.status(400).json({
                message:"please fill all the fields",
                error: true,
                success: false
            })
        }

        const response1 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1aeb6816a464c7ce0c897e256d4ba9e2&units=metric`);
        const response2 = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=1aeb6816a464c7ce0c897e256d4ba9e2`)

        return res.status(200).json({
            message: "the weather data of your location is here",
            error: false,
            success: true,
            data: {
                weatherData: response1.data,
                AirPollutionData: response2.data,
            }
        })
    }
    catch(error)
    {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}


const airPolutionData = async(req, res)=>{
    try
    {
        const {lat, lon} = req.body;

        if(!lat || !lon)
            {
                return res.status(400).json({
                    message: "fill the required fields",
                    error: true,
                    success: false
                })
            }

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=1aeb6816a464c7ce0c897e256d4ba9e2`)

        return res.status(200).json({
            message: "the air Pollution data of your location is here",
            error: false,
            success: true,
            data: response.data
        })
        
    }
    catch(error)
    {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}




module.exports = { getWeatherData, airPolutionData }