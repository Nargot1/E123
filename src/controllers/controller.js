const { getAllThreads,createThread } = require('../models/model')

async function index(req,res){
    let threads = await getAllThreads()
    res.render('pages/index', {threads})
}
function createGet(req,res){
    res.render('pages/create')
}
function createPost(req,res){
    const body = req.body

     createThread(body.title,body.text)

    res.redirect('/')
}
function showThread(req,res){
}

module.exports = {index, createGet, createPost, showThread}