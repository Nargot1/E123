const {ObjectId} = require('mongodb')
const {getDB} = require('../data/connection');

async function getAllThreads(){
    const db = await getDB();
    return await db.collection('threads')
    .find().sort({createdAt: -1}).toArray()
}

async function createThread(userId, title,text) {
    const db = await getDB()
    return await db.collection('threads').insertOne({title,text,createdAt: new Date(), likes: 0})
}

async function getThreadById(id) {
    const db = await getDB()
    return await db.collection('threads').findOne({ _id: new ObjectId(id) })
}

async function likeThread(id, userId) {
    const db = await getDB()
    console.log(userId)
    const likeList = (await db.collection('users').findOne({_id: new ObjectId(userId)})).likeList || [];
    let liked = likeList.find((a) => a == id);
    
    if (!liked){
        likeList.push(id)
        console.log(likeList);
        await db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: { likeList } });
        return await db.collection('threads').updateOne({ _id: new ObjectId(id) }, { $inc: { likes: 1 } })
    }
    else{
        console.log(liked)
        await db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: { likeList } });
        return await db.collection('threads').updateOne({ _id: new ObjectId(id) }, { $inc: { likes: 1 } })
    }
}

async function deleteThread(id, userId) {
    const db = await getDB()
    return await db.collection('threads').deleteOne({ _id: new ObjectId(id) })
}

async function updateThread(id, userId, title, text) {
    const db = await getDB()
    return await db.collection('threads').updateOne({ _id: new ObjectId(id) }, { $set: { userId, title, text } })
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