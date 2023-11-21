



const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


const jwt = require('jsonwebtoken')


mongoose.connect("mongodb+srv://amitvishwa:vishwa1981@cluster0.antppcb.mongodb.net/",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}),then(()=>{
    console.log("Connected to Mongo Db");
}).catch((e)=>{
    console.log("Error connecting to MongoDb", err);
})

// app.listen(port,()=>{
//     console.log('mongodb running on port 2000')
// })




