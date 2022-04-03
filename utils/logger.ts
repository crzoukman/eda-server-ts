import logger from 'pino';
import config from '../config';
import dayjs from 'dayjs';

const level = config.LOG_LEVEL;

export default logger({
  transport: {
    target: 'pino-pretty',
  },
  level,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
}); 