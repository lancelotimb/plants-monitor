const express = require('express');
const router = express.Router();
const humidityMeasurementsController = require('../controllers/humidityMeasurements.controller');

router.get('/', humidityMeasurementsController.get);

module.exports = router;
