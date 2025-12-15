const {ObjectId} = require('mongodb')
const {getDB} = require('../data/connection');

async function login(username,password) {
    const db = getDB();
    const account = await db.collection('users').findOne({username});
    if(!account) return "invalid username";
    if(account.password != password) return "invalid password";
    return account;
}

async function register(username,password) {
    const db = getDB();
    let account = await db.collection('users').findOne({username});
    if (account) return "Account with this username already exists";
    account = await db.collection('users').insertOne({username,password,likeList: []});
    return account
}

module.exports = { login, register }