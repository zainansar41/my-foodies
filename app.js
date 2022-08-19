const express=require('express')
require("dotenv").config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const EJS_INCLUDE_REGEX = require('ejs-include-regex');
const app= express();
const port=process.env.PORT ;
const {join}=require('path');
const router = require('./router/web');
const URI=process.env.URI || 3030

mongoose.connect(URI,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        console.log('connected')
});



app.set('view engine','ejs')
app.use(express.static(join(process.cwd(),'public')))
app.use('/login',express.static(join(process.cwd(),'public')))
app.use('/showRecipe',express.static(join(process.cwd(),'public')))
app.use('/showRegionFoods',express.static(join(process.cwd(),'public')))
app.use('/showsearch',express.static(join(process.cwd(),'public')))
app.use('/category',express.static(join(process.cwd(),'public')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json()) 

app.use('/',router)

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})