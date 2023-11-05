import axios from 'axios';

const weatherApiKey = process.env.WEATHER_API_KEY;

function transformWeatherData(data) {
  return {
    location: data.location.name,
    country: data.location.country,
    description: data.current.weather_descriptions[0],
    temperature: data.current.temperature,
    feelslike: data.current.feelslike,
  };
}

export const WeatherService = {
  async getCurrentWeather(city) {
    const url = `http://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${city}`;
    const response = await axios.get(url);
    return transformWeatherData(response.data);
  },
  async getForecast(city) {
    const url = `http://api.weatherstack.com/forecast?access_key=${weatherApiKey}&query=${city}`;
    const response = await axios.get(url);
    return response.data;
  },
};
