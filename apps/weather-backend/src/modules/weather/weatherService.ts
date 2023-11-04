import axios from 'axios';

const weatherApiKey = process.env.WEATHER_API_KEY;

export const WeatherService = {
  async getCurrentWeather(city) {
    const url = `http://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${city}`;
    const response = await axios.get(url);
    return response.data;
  },
  async getForecast(city) {
    const url = `http://api.weatherstack.com/forecast?access_key=${weatherApiKey}&query=${city}`;
    const response = await axios.get(url);
    return response.data;
  },
};
