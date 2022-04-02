import config from 'config';
import mongoose from 'mongoose';
import logger from './logger';

export default async function () {
  const dbUri = config.get<string>('dbUri');

  try {
    await mongoose.connect(dbUri);

    logger.info('Connected to DB');
  } catch (e) {
    process.exit(1);
  }
}