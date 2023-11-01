import {geocode} from './apis/geolocation';
import {forecast} from './apis/weather';
import express from 'express';
const weatherApiKey = process.env.WEATHER_API_KEY;
const geoApiKey = process.env.GEO_API_KEY;


const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = express();

app.get("/weather", (req, res) => {
  const { city = "Vienna" } = req.query;

  geocode(city, geoApiKey, (err, geodata) => {
    if (err) {
      res.send(err);
      return;
    }
    forecast(geodata, weatherApiKey, (err, message) => {
      if (err) {
        res.send(err);
        return;
      }
      res.send({
        forecast: message,
        location: geodata.location,
        address: city,
      });
    });
  });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
