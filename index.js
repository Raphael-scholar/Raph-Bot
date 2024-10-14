require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const logger = require('./src/utils/logger');
const bot = require('./src/bot');
const config = require('./src/config');

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Bot is alive!');
});

const startBot = async () => {
  try {
    await mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info('Connected to MongoDB');

    await bot.launch();
    logger.info(`${config.botName} is running`);

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });

    setInterval(() => {
      http.get(`http://localhost:${port}`);
    }, 5 * 60 * 1000);

    process.once('SIGINT', () => {
      bot.stop('SIGINT');
      server.close();
    });
    process.once('SIGTERM', () => {
      bot.stop('SIGTERM');
      server.close();
    });
  } catch (error) {
    logger.error('Error starting the bot:', error);
    process.exit(1);
  }
};

startBot();
