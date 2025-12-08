const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri)

let db;

async function connectDB() {
    try{
        await client.connect()
        db = await client.db('forum');
        console.log("polaczono")
    }catch(err){
        console.error("blad polaczenia", err)
    }
}

function getDB(){
    if(!db) throw new Error("Nie polaczone z baza");
    return db;
}
module.exports = { connectDB, getDB }