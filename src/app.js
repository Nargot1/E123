const cookieParser = require('cookie-parser')
const express = require('express');
const path = require('path')

const app = express();
const forumRouter = require("./routes/forumRouter");
const loginRouter = require("./routes/loginRouter");

app.set('view engine', 'ejs')
app.set('views', __dirname + "/views")

app.use(express.static(path.join(__dirname,'../public')))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use('/', forumRouter)
app.use('/', loginRouter)

module.exports = app