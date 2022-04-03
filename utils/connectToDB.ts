import config from '../config';
import mongoose from 'mongoose';
import logger from './logger';

export default async function () {
  const dbUri = config.DB_URI;

  try {
    await mongoose.connect(dbUri);

    logger.info('Connected to DB');
  } catch (e) {
    process.exit(1);
  }
}