/* TODO

    fix pushing to db (dups)

*/

const fs = require("fs");
const db_path = "./database.json";

const readAll = () => {
    return require(db_path);
};

const pushToDatabase = (endpoint, url) => {
    let db = readAll();

    const obj = {
        "endpoint": endpoint,
        "url": url
    };

    db.push(obj);

    fs.writeFile(db_path, JSON.stringify(db), (err) => {
        if(err) console.error(err);
    });
};

const getUrlByEndpoint = (endpoint) => {
    const db = readAll();
    let url = "http://localhost:3000/"

    db.forEach(item => {
        console.log(item);
        if(item.endpoint == endpoint) url = item.url;
    });

    return url;
};

module.exports = {
    readAll,
    pushToDatabase,
    getUrlByEndpoint,
};