import express from 'express';
import cors, { CorsOptionsDelegate } from 'cors';
import bodyParser from 'body-parser';
import commandsQueueRouter from './src/routes/commandsQueue.route';
import humiditySensorsRouter from './src/routes/humiditySensors.route';
import humidityMeasurementsRouter from './src/routes/humidityMeasurements.route';
import dhtMeasurementsRouter from './src/routes/dhtMeasurements.route';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use('/api/humidity-measurements', cors(corsOptionsDelegate), humidityMeasurementsRouter);
app.use('/api/dht-measurements', cors(corsOptionsDelegate), dhtMeasurementsRouter);
app.use('/api/humidity-sensors', cors(corsOptionsDelegate), humiditySensorsRouter);
app.use('/api/commands', cors(corsOptionsDelegate), commandsQueueRouter);

app.listen(port, '0.0.0.0');

export default app;
