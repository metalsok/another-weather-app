import axios from 'axios';

export const forecast = async (city, weatherApiKey) => {
  const url = `http://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${city}`;

  try {
    const response = await axios.get(url);
    return response.data; // Simply return the data
  } catch (err) {
    throw err;
  }
};
