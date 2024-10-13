require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./src/utils/logger');
const bot = require('./src/bot');
const config = require('./src/config');

const startBot = async () => {
  try {
    await mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info('Connected to MongoDB');

    await bot.launch();
    logger.info(`${config.botName} is running`);

    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
  } catch (error) {
    logger.error('Error starting the bot:', error);
    process.exit(1);
  }
};

startBot();
