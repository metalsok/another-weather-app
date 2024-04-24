import express from 'express';
import cors from 'cors';
import { WeatherRouter } from './modules/weather/weatherRoutes';
import { sequelize } from './config/dbConfig';
import { UserRouter } from './modules/user/userRouter';
import { authenticateToken } from './modules/user/userMiddleware';
import { ChatGPTRouter } from './modules/chat-gpt/chatgptRouter';
import { RawgRouter } from './modules/rawg/rawgRouter';
import * as http from 'http';
import { Server } from 'socket.io';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",  // This should match the URL of your Angular app
    methods: ["GET", "POST"]
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    // Broadcast the message to all connected sockets
    io.emit('message', msg);
  });
});

app.use('/api/weather', authenticateToken, WeatherRouter);

app.use('/api/chatgpt', ChatGPTRouter);

app.use('/api/user', UserRouter);
app.use('/api/rawg', RawgRouter);

sequelize.sync().then(() => {
  server.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });
});
