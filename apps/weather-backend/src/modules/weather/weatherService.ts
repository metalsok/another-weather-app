import axios from 'axios';

const weatherApiKey = process.env.TOMORROWIO_API_KEY;

function transformWeatherData(data) {
  console.log(data);

  return data.timelines.daily;
}

export const WeatherService = {
  async getCurrentWeather(lat = '40.9376', lon = '40.9376') {
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&apikey=${weatherApiKey}`;
    const response = await axios.get(url);
    return transformWeatherData(response.data);
  },
};
