const { getAllThreads, createThread, getThreadById, likeThread, deleteThread, updateThread, searchThreadsByTitle } = require('../models/model')

async function getIndex(req, res) {
    const q = req.query.q || ''
    const sort = req.query.sort || 'date'
    const account = req.cookies.account;
    let threads
    if(q){
        threads = await searchThreadsByTitle(q, sort)
    } else {
        threads = await searchThreadsByTitle('', sort)
    }
    res.render('pages/index', { threads, q, sort, account: account || '' })
}
function getCreate(req, res) {
    const account = req.cookies.account;
    res.render('pages/create', {account: account || '' })
}
function postCreate(req, res) {
    const body = req.body
    const account = req.cookies.account;

    createThread(account, body.title, body.text)

    res.redirect('/')
}
async function getShow(req, res) {
    const id = req.query.id
    const account = req.cookies.account;
    if (!id) return res.redirect('/')
    const thread = await getThreadById(id)
    if (!thread) return res.status(404).send('Thread not found')
    res.render('pages/show', { thread, account: account || ''  })
}

async function getEdit(req, res) {
    const id = req.query.id
    const account = req.cookies.account;
    if (!id) return res.redirect('/')
    const thread = await getThreadById(id)
    if (!thread) return res.status(404).send('Thread not found')
    res.render('pages/edit', { thread, account: account || ''  })
}

async function postLike(req, res) {
    const id = req.body.id
    const account = req.cookies.account;
    if (!id) return res.status(400).send('Wrong id')
    const alreadyLiked = await likeThread(id, account);
    res.status(100).redirect(`/show?id=${id}`)
}

async function postDelete(req, res) {
    const id = req.body.id;
    const account = req.cookies.account;
    if (!id) return res.status(400).send('Wrong id')
    await deleteThread(id, account);
    res.status(100).redirect('/');
}

async function postEdit(req, res) {
    const id = req.body.id
    const title = req.body.title
    const text = req.body.text
    const account = req.cookies.account;
    if (!id) return res.status(400).send('Wrong id')
    await updateThread(id, account, title, text)
    res.status(100).redirect(`/show?id=${id}`)
}

module.exports = { getIndex, getCreate, postCreate, getShow, getEdit, postLike, postDelete, postEdit }