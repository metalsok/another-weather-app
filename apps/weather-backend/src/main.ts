import { forecast } from './api/weather';
import express from 'express';
import { authentication } from './api/authentication';
import cors from 'cors';

const weatherApiKey = process.env.WEATHER_API_KEY;
const geoApiKey = process.env.GEO_API_KEY;

const apiRouter = express.Router();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = express();
// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors());

apiRouter.post('/auth', (req, res) => {
  const { username, password } = req.body;
  res.status(200).send(`Hello ${username}`);
});
apiRouter.get('/weather', async (req, res) => {
  try {
    const { city } = req.query;

    // Validate the input
    if (!city) {
      return res.status(400).json({ error: "City parameter is required" });
    }

    // Assuming forecast is an async function or returns a promise
    const response = await forecast(city, weatherApiKey);

    // Send the forecast data back to the client
    res.status(200).json(response);

  } catch (error) {
    // Handle the error based on its type or content
    console.error(error);

    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "An unexpected error occurred";

    // Respond with an appropriate error status code and message
    res.status(statusCode).json({ error: errorMessage });
  }
});

app.use('/api', apiRouter);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
