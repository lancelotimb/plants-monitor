import sqlite3 from 'sqlite3';
import { DatabaseRows } from '../types/types';

const DATABASE_PATH = '../database/database.db';

export async function executeQuery(sql: string): Promise<DatabaseRows<any>> {
    const db = new sqlite3.Database(DATABASE_PATH, sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.error(err.message);
        }
    });

    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve({ rows });
            }
            db.close((error) => {
                if (error) {
                    console.error(error.message);
                }
            });
        });
    });
}
