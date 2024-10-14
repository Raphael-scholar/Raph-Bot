const { Markup } = require('telegraf');
const config = require('../config');

module.exports = async (ctx) => {
  const commands = [
    { command: 'start', description: 'Launch the bot and view the main menu' },
    { command: 'help', description: 'Display this help message' },
    { command: 'weather', description: 'Get current weather for a city' },
    { command: 'translate', description: 'Translate text to another language' },
    { command: 'reminder', description: 'Set a reminder' },
  ];

  const helpMessage = `
🚀 *Welcome to ${config.botName} v${config.version}*

I'm your personal assistant bot, ready to help you with various tasks. Here's what I can do:

${commands.map(cmd => `/${cmd.command} - ${cmd.description}`).join('\n')}

*Examples:*
• /weather New York
• /translate Hello, how are you?
• /reminder 30m Call mom

*Additional Features:*
• Inline mode: Type @${ctx.botInfo.username} in any chat to use me inline!
• Customizable settings: Use /settings to personalize your experience

*Need more help?*
Feel free to contact the bot owner or check out our website for detailed guides and tutorials.

Enjoy using ${config.botName}! 🎉
`;

  const keyboard = Markup.inlineKeyboard([
    [Markup.button.url('📚 Full Documentation', 'https://your-bot-docs-url.com')],
    [Markup.button.callback('⚙️ Settings', 'settings'), Markup.button.callback('📞 Contact Support', 'support')]
  ]);

  await ctx.replyWithMarkdown(helpMessage, keyboard);
};
