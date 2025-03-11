const express = require('express');
const app = express();
const port = 9000;

app.use(express.json())


const connectDB = require('./config/database');

//all routes files
const user = require('./routes/user.route');
const weather = require('./routes/weather.route');


connectDB();

app.get('/', (req, res)=>{
    res.send("hello aneeeeesssaa");
})

app.use('/api/user', user);
app.use('/api/weather', weather);


app.listen(port, ()=>{
    console.log("this app is running on port: ", port);
})