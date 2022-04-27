const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbName = 'restro';
const conxnURL = 'mongodb+srv://supa:test123456@cluster0.ydy3p.mongodb.net/Restro?retryWrites=true&w=majority';
const OID = mongodb.ObjectId; 

module.exports = {
    MongoClient,
    dbName,
    conxnURL,
    OID
}
