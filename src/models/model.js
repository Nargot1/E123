const {ObjectId} = require('mongodb')
const {getDB} = require('../data/connection')

async function getAllThreads(){
    const db = await getDB();
    return await db.collection('threads')
    .find().sort({createdAt: -1}).toArray()
}
async function createThread(title,text) {
    const db = await getDB()
    return await db.collection('threads').insertOne({title,text,createdAt: new Date()})
}

module.exports = { getAllThreads, createThread }