const express = require('express');

const app = express();
const router = require("./routes/forumRouter");

app.set('view engine', 'ejs')
app.set('views', __dirname + "/views")

app.use(express.static('../public'))
app.use(express.urlencoded({extended: true}))
app.use('/', router)

module.exports = app