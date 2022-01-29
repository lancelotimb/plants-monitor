const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const humidityMeasurementsRouter = require('./src/routes/humidityMeasurements.route');

app.get('/', (req, res) => {
    res.json({'message': 'ok'});
})

app.use('/humidity-measurements', humidityMeasurementsRouter);

/* Error handler middleware */
app.use((err, req, res) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
