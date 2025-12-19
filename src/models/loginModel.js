const crypto = require('crypto')
const {ObjectId} = require('mongodb')
const {getDB} = require('../data/connection');

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex')
}

async function login(username,password) {
    const db = await getDB();
    const account = await db.collection('users').findOne({username});
    if(!account) return "invalid username";
    if(!account.passwordHash) return "invalid account";
    const hashedPassword = hashPassword(password)
    if(hashedPassword !== account.passwordHash) return "invalid password";
    return account;
}

async function register(username,password) {
    const db = await getDB();
    let existingAccount = await db.collection('users').findOne({username});
    if (existingAccount) return "Account with this username already exists";
    const hashedPassword = hashPassword(password)

    const account = await db.collection('users').insertOne({username, passwordHash: hashedPassword, likeList: []});
    return account
}

module.exports = { login, register }