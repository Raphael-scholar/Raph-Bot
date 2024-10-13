const { Telegraf, session } = require('telegraf');
const config = require('./config');
const logger = require('./utils/logger');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const startCommand = require('./commands/start');
const helpCommand = require('./commands/help');
const weatherCommand = require('./commands/weather');
const translateCommand = require('./commands/translate');
const reminderCommand = require('./commands/reminder');

const bot = new Telegraf(config.botToken);

bot.use(session());
bot.use(rateLimiter);
bot.use(errorHandler);

bot.command('start', startCommand);
bot.command('help', helpCommand);
bot.command('weather', weatherCommand);
bot.command('translate', translateCommand);
bot.command('reminder', reminderCommand);

bot.on('text', async (ctx) => {
  const message = ctx.message.text.toLowerCase();
  if (message.includes('hello') || message.includes('hi')) {
    await ctx.reply(`Hello, ${ctx.from.first_name}! How can I assist you today?`);
  } else {
    await ctx.reply("I'm not sure how to respond to that. Try using one of my commands or say 'hello'!");
  }
});

module.exports = bot;
