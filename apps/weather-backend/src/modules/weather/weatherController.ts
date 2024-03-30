import { WeatherService } from './weatherService';
import { GeoService } from './geoService';

export const WeatherController = {
  async getCurrentWeather(req, res) {
    try {
      const { city } = req.query;
      if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
      }
      const [lat, lon] = await GeoService.getLatLon(city);
      const data = await WeatherService.getCurrentWeather(lat, lon);
      res.status(200).json(data);
    } catch (error) {
      // Handle the error based on its type or content
      console.error(error);

      const statusCode = error.response?.status || 500;
      const errorMessage = error.message || 'An unexpected error occurred';

      // Respond with an appropriate error status code and message
      res.status(statusCode).json({ error: errorMessage });
    }
  },
};
