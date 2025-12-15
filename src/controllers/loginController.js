const { login, register } = require("../models/loginModel")

function getLogin(req,res){
    const error = req.query.error
    res.render('pages/login', {error: error || ''})
}

async function postLogin(req,res){
    const body = req.body;
    const account = await login(body.username,body.password);
    if(typeof account === "string"){
        res.redirect(`/login?error=${account}`)
        return
    }
    console.log(account._id)
    res.cookie('account', account._id, { maxAge: 3600000 });
    res.redirect('/')
}

function getRegister(req,res){
    const error = req.query.error
    res.render('pages/register', {error: error ?? ''})
}

async function postRegister(req,res){
    const body = req.body;
    const account = await register(body.username,body.password);
    if(typeof account === "string"){
        res.redirect(`/register?error=${account}`)
        return
    }
    res.cookie('account', account.insertedId, { maxAge: 3600000 });
    res.redirect('/')
}

module.exports = { getLogin, postLogin, getRegister, postRegister }