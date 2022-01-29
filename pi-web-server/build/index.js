"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const humidityMeasurements_route_1 = __importDefault(require("./src/routes/humidityMeasurements.route"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.json({ 'message': 'ok' });
});
app.use('/humidity-measurements', humidityMeasurements_route_1.default);
app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
