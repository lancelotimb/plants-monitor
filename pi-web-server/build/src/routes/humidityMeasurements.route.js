"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const humidityMeasurements_controller_1 = require("../controllers/humidityMeasurements.controller");
const router = express_1.default.Router();
router.get('/', humidityMeasurements_controller_1.getHumidityMeasurementsController);
exports.default = router;
