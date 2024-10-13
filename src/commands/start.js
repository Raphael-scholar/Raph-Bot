const { Markup } = require('telegraf');
const config = require('../config');

module.exports = async (ctx) => {
  const keyboard = Markup.inlineKeyboard([
    [Markup.button.callback('🌤 Weather', 'weather'), Markup.button.callback('🌐 Translate', 'translate')],
    [Markup.button.callback('⏰ Reminder', 'reminder'), Markup.button.callback('ℹ️ Help', 'help')]
  ]);

  const welcomeMessage = `
Welcome to ${config.botName} v${config.version}! 🚀

I'm your personal assistant bot, ready to help you with various tasks. Here's what I can do:

🌤 Check weather information
🌐 Translate text between languages
⏰ Set and manage reminders

Feel free to explore my features using the buttons below or type /help for more information.

Let's get started! How can I assist you today?
`;

  await ctx.reply(welcomeMessage, keyboard);
};
