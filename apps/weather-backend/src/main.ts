import express from 'express';
import cors from 'cors';
import { WeatherRouter } from './modules/weather/weatherRoutes';
import { sequelize } from './config/dbConfig';
import { UserRouter } from './modules/user/userRouter';
import { authenticateToken } from './modules/user/userMiddleware';
import { ChatGPTRouter } from './modules/chat-gpt/chatgptRouter';
import { RawgRouter } from './modules/rawg/rawgRouter';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/weather', authenticateToken, WeatherRouter);

app.use('/api/chatgpt', ChatGPTRouter);

app.use('/api/user', UserRouter);
app.use('/api/rawg', RawgRouter);

sequelize.sync().then(() => {
  app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });
});
