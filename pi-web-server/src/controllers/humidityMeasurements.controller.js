const humidityMeasurements = require('../services/humidityMeasurements.service');

async function get(req, res, next) {
    try {
        res.json(await humidityMeasurements.get());
    } catch (err) {
        console.error(`Error while getting humidity measurements`, err.message);
        next(err);
    }
}

module.exports = {
    get
};
