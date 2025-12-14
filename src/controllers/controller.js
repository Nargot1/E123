const { getAllThreads, createThread, getThreadById, likeThread, deleteThread, updateThread, searchThreadsByTitle } = require('../models/model')

async function getIndex(req, res) {
    const q = req.query.q || ''
    const sort = req.query.sort || 'date'
    let threads
    if(q){
        threads = await searchThreadsByTitle(q, sort)
    } else {
        threads = await searchThreadsByTitle('', sort)
    }
    res.render('pages/index', { threads, q, sort })
}
function getCreate(req, res) {
    res.render('pages/create')
}
function postCreate(req, res) {
    const body = req.body

    createThread(body.title, body.text)

    res.redirect('/')
}
async function getShow(req, res) {
    const id = req.query.id
    if (!id) {
        return res.redirect('/')
    }
    const thread = await getThreadById(id)
    if (!thread) return res.status(404).send('Thread not found')
    res.render('pages/show', { thread })
}

async function getEdit(req, res) {
    const id = req.query.id
    if (!id) return res.redirect('/')
    const thread = await getThreadById(id)
    if (!thread) return res.status(404).send('Thread not found')
    res.render('pages/edit', { thread })
}

async function postLike(req, res) {
    const id = req.body.id
    if (!id) return res.status(400).send('Wrong id')
    await likeThread(id);
    res.redirect(`/show?id=${id}`)
}

async function postDelete(req, res) {
    const id = req.body.id;
    if (!id) return res.status(400).send('Wrong id')
    await deleteThread(id);
    res.redirect('/');
}

async function postEdit(req, res) {
    const id = req.body.id
    const title = req.body.title
    const text = req.body.text
    if (!id) return res.status(400).send('Wrong id')
    await updateThread(id, title, text)
    res.redirect(`/show?id=${id}`)
}

module.exports = { getIndex, getCreate, postCreate, getShow, getEdit, postLike, postDelete, postEdit }