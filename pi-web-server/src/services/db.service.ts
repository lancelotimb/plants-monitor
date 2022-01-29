import sqlite3 from 'sqlite3';

const DATABASE_PATH = "../database/database.db";

export async function executeQuery(sql: string): Promise<{rows: Array<{date: number, values: string}>}> {
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





