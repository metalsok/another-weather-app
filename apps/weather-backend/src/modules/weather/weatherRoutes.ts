import express from 'express';
import { WeatherController } from './weatherController';

const router = express.Router();

router.get('/current', WeatherController.getCurrentWeather);
router.get('/forecast', WeatherController.getForecast);

// Export the router
export { router as weatherRouter };
