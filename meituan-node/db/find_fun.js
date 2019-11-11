const find = (collec, query, db) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collec);
        collection.findOne(query, (err, result) => {
            err ? reject(err) : resolve(result);
        });
    });
}

const finds = (collec, query, db) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collec);
        collection.find(query).toArray((err, docs) => {
            err ? reject(err) : resolve(docs);
        });
    });
}

module.exports = {
    find,
    finds
}