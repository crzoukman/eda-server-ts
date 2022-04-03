require("dotenv").config();
import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config';
import connectToDB from './utils/connectToDB';
import logger from './utils/logger';
import router from './routes';

const port = config.PORT;

const app = express();

app.use(json());
app.use(cookieParser());
app.use(cors());
app.use(router);

app.listen(process.env.PORT || port, async () => {
  console.clear();
  await connectToDB();
  logger.info('Server is running on PORT ' + port);
});