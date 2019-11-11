const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'meituan';

console.log('123');


const connect = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, client) {
            db = client.db(dbName);
            err ? reject(err) : resolve(db);
        });
    });
}
module.exports = { connect };

