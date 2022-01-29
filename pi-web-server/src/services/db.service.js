const sqlite3 = require('sqlite3').verbose();

const DATABASE_PATH = "../database/database.db";

async function query(sql) {
    let db = new sqlite3.Database(DATABASE_PATH, sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.error(err.message);
        }
    });

    return new Promise(function (resolve, reject) {
        db.all(sql, function cb(err, rows) {
            if (err) {
                reject({
                    'error': err
                });
            } else {
                resolve({
                    rows: rows
                });
            }
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                }
            });
        });
    });
}

module.exports = {
    query
}





