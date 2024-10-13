const moment = require('moment');
const { Markup } = require('telegraf');
const logger = require('../utils/logger');
const database = require('../utils/database');
const config = require('../config');

module.exports = async (ctx) => {
  const params = ctx.message.text.split(' ').slice(1);
  
  if (params.length < 2) {
    return ctx.reply('Please provide a time and message. Usage: /reminder <time> <message>');
  }

  const timeStr = params[0];
  const message = params.slice(1).join(' ');

  try {
    const time = moment(timeStr, ['HH:mm', 'YYYY-MM-DD HH:mm', 'MM-DD HH:mm', 'h:mma', 'ha']);
    
    if (!time.isValid()) {
      throw new Error('Invalid time format');
    }

    const now = moment();
    if (time.isBefore(now)) {
      time.add(1, 'day');
    }

    const reminder = {
      userId: ctx.from.id,
      time: time.toDate(),
      message: message,
    };

    await database.saveReminder(reminder);

    const formattedTime = time.format('MMMM Do YYYY, h:mm a');
    const confirmationMessage = `
⏰ Reminder set!

Time: ${formattedTime}
Message: ${message}

I'll remind you at the specified time.
`;

    const keyboard = Markup.inlineKeyboard([
      Markup.button.callback('❌ Cancel Reminder', `cancel_reminder_${reminder._id}`),
      Markup.button.callback('📋 List All Reminders', 'list_reminders')
    ]);

    await ctx.reply(confirmationMessage, keyboard);
  } catch (error) {
    logger.error('Error setting reminder:', error);
    await ctx.reply('Sorry, I couldn\'t set the reminder. Please check the time format and try again.');
  }
};
