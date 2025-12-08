const express = require('express');
const path = require('path')

const app = express();
const router = require("./routes/forumRouter");

app.set('view engine', 'ejs')
app.set('views', __dirname + "/views")

app.use(express.static(path.join(__dirname,'../public')))
app.use(express.urlencoded({extended: true}))
app.use('/', router)

module.exports = app