import axios from 'axios';

const weatherApiKey = process.env.WEATHER_API_KEY;

export const WeatherController = {
  async getCurrentByCity(req, res) {
    try {
      const { city } = req.query;

      // Validate the input
      if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
      }
      const url = `http://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${city}`;

      // Assuming forecast is an async function or returns a promise
      const response = await axios.get(url);

      // Send the forecast data back to the client
      res.status(200).json(response.data);
    } catch (error) {
      // Handle the error based on its type or content
      console.error(error);

      const statusCode = error.statusCode || 500;
      const errorMessage = error.message || 'An unexpected error occurred';

      // Respond with an appropriate error status code and message
      res.status(statusCode).json({ error: errorMessage });
    }
  },
};

