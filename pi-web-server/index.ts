import express from 'express';
import humidityMeasurementsRouter from './src/routes/humidityMeasurements.route';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.json({ message: 'ok' });
});

app.use('/humidity-measurements', humidityMeasurementsRouter);

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
