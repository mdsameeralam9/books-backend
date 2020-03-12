const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
require('dotenv').config();

mongoose.connect("mongodb://localhost:27017/BOOK_DATABASE")
.then (function(){
    console.log("mongoDb is connected successfully")
    
}).catch(function(error){
    console.log(error)
})



const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(routes);

app.listen(PORT, function() {
    console.log(`server is running at port ${PORT}`);
});