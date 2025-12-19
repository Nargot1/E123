const {ObjectId} = require('mongodb')
const {getDB} = require('../data/connection');

async function getAllThreads(){
    const db = await getDB();
    return await db.collection('threads')
    .find().sort({createdAt: -1}).toArray()
}

async function createThread(userId, title,text) {
    const db = await getDB()
    return await db.collection('threads').insertOne({userId, title, text, createdAt: new Date(), likes: 0})
}

async function getThreadById(id) {
    const db = await getDB()
    return await db.collection('threads').findOne({ _id: new ObjectId(id) })
}

async function likeThread(id, userId) {
    const db = await getDB()

    const user = await db.collection('users').findOne({_id: new ObjectId(userId)})
    const likeList = (user && user.likeList) ? user.likeList : []
    const alreadyLiked = likeList.find(a => String(a) === String(id))
    if(!alreadyLiked){
        likeList.push(String(id))
        await db.collection('users').updateOne({ _id: user._id }, { $set: { likeList } })
        await db.collection('threads').updateOne({ _id: new ObjectId(id) }, { $inc: { likes: 1 } })
        return { liked: true }
    }

    return { liked: true }
}

async function deleteThread(id, userId) {
    const db = await getDB()
    const thread = await db.collection('threads').findOne({ _id: new ObjectId(id) })
    if(!thread) return { notFound: true }

    if(String(thread.userId) !== String(userId)) return { unauthorized: true }
    const res = await db.collection('threads').deleteOne({ _id: new ObjectId(id) })
    return res
}

async function updateThread(id, userId, title, text) {
    const db = await getDB()
    const thread = await db.collection('threads').findOne({ _id: new ObjectId(id) })
    if(!thread) return { notFound: true }
    if(String(thread.userId) !== String(userId)) return { unauthorized: true }
    return await db.collection('threads').updateOne({ _id: new ObjectId(id) }, { $set: { title, text } })
}

async function searchThreadsByTitle(q, sort = 'date'){
    const db = await getDB()
    const filter = q ? { title: { $regex: q, $options: 'i' } } : {}
    let sortObj = { createdAt: -1 }
    if(sort === 'likes') sortObj = { likes: -1, createdAt: -1 }
    return await db.collection('threads')
        .find(filter).sort(sortObj).toArray()
}

module.exports = { getAllThreads, createThread, getThreadById, likeThread, deleteThread, updateThread, searchThreadsByTitle }