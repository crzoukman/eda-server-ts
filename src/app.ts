require("dotenv").config();
import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from 'config';
import connectToDB from './utils/connectToDB';
import logger from './utils/logger';
import router from './routes';

const port = config.get('port');

const app = express();

app.use(json());
app.use(cookieParser());
app.use(cors());
app.use(router);

app.listen(port, async () => {
  console.clear();
  await connectToDB();
  logger.info('Server is running at http://localhost:' + port);
});