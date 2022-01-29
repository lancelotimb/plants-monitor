const db = require('./db.service');

async function get() {
    const {rows} = await db.query(
        `SELECT date, value FROM humidity_measurements`
    );

    return rows
}

module.exports = {
    get
}
