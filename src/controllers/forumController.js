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
    const id = req.query.id;
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
    if(String(thread.userId) !== String(account)) return res.status(403).send('Forbidden')
    res.render('pages/edit', { thread, account: account || ''  })
}

async function postLike(req, res) {
    const id = req.body.id
    const account = req.cookies.account;
    if (!id) return res.status(400).send('Wrong id')
    const alreadyLiked = await likeThread(id, account);
    res.redirect(`/show?id=${id}`)
}

async function postDelete(req, res) {
    const id = req.body.id;
    const account = req.cookies.account;
    if (!id) return res.status(400).send('Wrong id')
    const result = await deleteThread(id, account);
    if(result && result.unauthorized) return res.status(403).send('Forbidden')
    if(result && result.notFound) return res.status(404).send('Not found')
    res.redirect('/');
}

async function postEdit(req, res) {
    const id = req.body.id
    const title = req.body.title
    const text = req.body.text
    const account = req.cookies.account;
    if (!id) return res.status(400).send('Wrong id')
    const result = await updateThread(id, account, title, text)
    if(result && result.unauthorized) return res.status(403).send('Forbidden')
    if(result && result.notFound) return res.status(404).send('Not found')
    res.redirect(`/show?id=${id}`)
}

module.exports = { getIndex, getCreate, postCreate, getShow, getEdit, postLike, postDelete, postEdit }