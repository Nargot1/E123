const {ObjectId} = require('mongodb')
const {getDB} = require('../data/connection');

async function getAllThreads(){
    const db = await getDB();
    return await db.collection('threads')
    .find().sort({createdAt: -1}).toArray()
}

async function createThread(title,text) {
    const db = await getDB()
    return await db.collection('threads').insertOne({title,text,createdAt: new Date(), likes: 0})
}

async function getThreadById(id) {
    const db = await getDB()
    return await db.collection('threads').findOne({ _id: new ObjectId(id) })
}

async function likeThread(id) {
    const db = await getDB()
    return await db.collection('threads').updateOne({ _id: new ObjectId(id) }, { $inc: { likes: 1 } })
}

async function deleteThread(id) {
    const db = await getDB()
    return await db.collection('threads').deleteOne({ _id: new ObjectId(id) })
}

async function updateThread(id, title, text) {
    const db = await getDB()
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