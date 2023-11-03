import express from 'express';
import { WeatherController } from '../controllers/weatherController';

const router = express.Router();

router.get('/', WeatherController.getCurrentByCity);
// Export the router
export { router as weatherRouter };
