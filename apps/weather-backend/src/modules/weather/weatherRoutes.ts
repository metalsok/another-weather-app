import express from 'express';
import { WeatherController } from './weatherController';
import { authenticateToken } from '../user/userMiddleware';

const router = express.Router();

router.get('/current', WeatherController.getCurrentWeather);

// Export the router
export { router as WeatherRouter };
