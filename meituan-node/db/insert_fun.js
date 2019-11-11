
//增加
const insert = (collec, docs, db) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collec);
        collection.insertOne(docs, (err, result) => {
            err ? reject(err) : resolve(result);
        });
    });
}

// 增加多个
const inserts = (collec, docs, db) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collec);
        collection.insertMany(docs, (err, result) => {
            err ? reject(err) : resolve(result);
        });
    });
}


module.exports = {
    insert,
    inserts
}


