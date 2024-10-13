require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./src/utils/logger');
const bot = require('./src/bot');
const config = require('./src/config');

mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to MongoDB');
    bot.launch();
    logger.info(`${config.botName} is running`);
  })
  .catch((err) => {
    logger.error('MongoDB connection error:', err);
    process.exit(1);
  });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
