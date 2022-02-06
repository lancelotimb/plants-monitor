import express from 'express';
import cors, { CorsOptionsDelegate } from 'cors';
import humidityMeasurementsRouter from './src/routes/humidityMeasurements.route';
import dhtMeasurementsRouter from './src/routes/dhtMeasurements.route';

const app = express();
const port = 3001;

app.use(cors());
const CORS_WHITE_LIST = ['http://localhost:3000', 'https://plants-monitor.vercel.app']; // TODO move to .env file
const corsOptionsDelegate: CorsOptionsDelegate = (req, callback) => {
    const origin = req.headers.Origin;
    if (origin && typeof origin === 'string' && CORS_WHITE_LIST.indexOf(origin) !== -1) {
        // Enable the requested origin in the CORS response
        callback(null, { origin: true });
    } else {
        // Disable CORS for this request
        callback(null, { origin: false });
    }
};

app.get('/', (req, res) => {
    res.json({ message: 'ok' });
});

app.use('/humidity-measurements', cors(corsOptionsDelegate), humidityMeasurementsRouter);
app.use('/dht-measurements', cors(corsOptionsDelegate), dhtMeasurementsRouter);

app.listen(port, '0.0.0.0');

export default app;
