import axios from 'axios';

const geoApiKey = process.env.GEO_API_KEY;

function transformData(data) {
  const { coordinates } = data.features[0].geometry;
  return coordinates;
}

export const GeoService = {
  async getLatLon(city: string) {
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${city}&access_token=${geoApiKey}`;
    try {
      const response = await axios.get(url);
      return transformData(response.data);
    } catch (err) {
      throw err;
    }
  },
};
