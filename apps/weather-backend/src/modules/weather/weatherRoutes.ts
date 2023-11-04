import express from 'express';
import { WeatherController } from './weatherController';
import { authenticateToken } from '../user/userMiddleware';

const router = express.Router();

router.get('/current',authenticateToken, WeatherController.getCurrentWeather);
router.get('/forecast',authenticateToken, WeatherController.getForecast);

// Export the router
export { router as WeatherRouter };
