import axios from 'axios';

const GeoController = {
  async getLatLon(city, geoApiKey) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${geoApiKey}`;
    try {
      return await axios.get(url);
    } catch (err) {
      throw err;
    }
  },
};
export default GeoController
