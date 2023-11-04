import express from 'express';
import cors from 'cors';
import { weatherRouter } from './modules/weather/weatherRoutes';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/weather', weatherRouter);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
