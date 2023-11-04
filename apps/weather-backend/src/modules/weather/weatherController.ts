import { WeatherService } from './weatherService';

export const WeatherController = {
  async getCurrentWeather(req, res) {
    await handleWeatherRequest(req, res, WeatherService.getCurrentWeather);
  },

  async getForecast(req, res) {
    await handleWeatherRequest(req, res, WeatherService.getForecast);
  },
};

async function handleWeatherRequest(req, res, weatherFunction) {
  try {
    const { city } = req.query;

    // Validate the input
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    // Get the weather data or forecast from the service
    const weatherData = await weatherFunction(city);

    // Send the weather data back to the client
    res.status(200).json(weatherData);
  } catch (error) {
    // Handle the error based on its type or content
    console.error(error);

    const statusCode = error.response?.status || 500;
    const errorMessage = error.message || 'An unexpected error occurred';

    // Respond with an appropriate error status code and message
    res.status(statusCode).json({ error: errorMessage });
  }
}

