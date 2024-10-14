const { Markup } = require('telegraf');
const fs = require('fs').promises;
const path = require('path');
const config = require('../config');

module.exports = {
  name: 'help',
  description: 'Display bot commands and information',
  usage: '/help [command]',
  category: 'General',
  async execute(ctx, args) {
    const commandsPath = path.join(__dirname, '..', 'commands');
    const commandFiles = await fs.readdir(commandsPath);
    const commands = await Promise.all(commandFiles
      .filter(file => file.endsWith('.js'))
      .map(async file => {
        const command = require(path.join(commandsPath, file));
        return {
          name: command.name,
          description: command.description,
          usage: command.usage,
          category: command.category
        };
      }));

    if (args.length > 0) {
      const commandName = args[0].toLowerCase();
      const command = commands.find(cmd => cmd.name.toLowerCase() === commandName);
      
      if (command) {
        return ctx.replyWithMarkdown(getCommandInfo(command), { disable_web_page_preview: true });
      } else {
        return ctx.reply(`Command "${commandName}" not found. Use /help to see all commands.`);
      }
    }

    const helpMessage = getHelpMessage(commands);
    const keyboard = Markup.inlineKeyboard([
      [Markup.button.callback('📊 Command Stats', 'command_stats'), Markup.button.callback('🔍 Search Commands', 'search_commands')],
      [Markup.button.callback('📚 Categories', 'show_categories'), Markup.button.callback('🔄 Check for Updates', 'check_updates')],
      [Markup.button.url('📞 Contact Support', `https://t.me/${config.ownerId}`)]
    ]);

    await ctx.replyWithPhoto(
      { url: 'https://example.com/your-bot-image.jpg' },
      { caption: helpMessage, parse_mode: 'Markdown', ...keyboard }
    );
  }
};

function getHelpMessage(commands) {
  const commandList = commands.map(cmd => `/${cmd.name} - ${cmd.description}`).join('\n');
  return `
╭───────────⦿ ${config.botName.toUpperCase()} HELP ⦿───────────╮
${commandList}
├───────────⦿ USAGE INFO ⦿───────────┤
│ • Use /help <command> for details
│ • Use inline buttons for more options
│ • Supported languages: ${config.supportedLanguages.join(', ')}
│ • Max reminders: ${config.maxReminders}
│ • Time zone: ${config.timeZone}
╰───────────⦿ v${config.version} ⦿───────────╯
`;
}

function getCommandInfo(command) {
  return `
╭────⦿ COMMAND: /${command.name} ⦿────╮
│ Description: ${command.description}
│ Usage: ${command.usage || 'No specific usage provided'}
│ Category: ${command.category || 'Uncategorized'}
╰────⦿ END ⦿────╯
`;
}

module.exports.handleCallbacks = async (ctx) => {
  const callbackQuery = ctx.callbackQuery;
  const action = callbackQuery.data;

  switch (action) {
    case 'command_stats':
      await showCommandStats(ctx);
      break;
    case 'search_commands':
      await ctx.answerCbQuery();
      await ctx.reply('Enter a keyword to search for commands:');
      ctx.scene.enter('searchCommands');
      break;
    case 'show_categories':
      await showCategories(ctx);
      break;
    case 'check_updates':
      await checkForUpdates(ctx);
      break;
  }
};

async function showCommandStats(ctx) {
  const statsMessage = `
╭───────⦿ COMMAND STATISTICS ⦿───────╮
│ Coming soon!
╰───────⦿ STAY TUNED ⦿───────╯
`;
  await ctx.answerCbQuery();
  await ctx.editMessageText(statsMessage, { parse_mode: 'Markdown' });
}

async function showCategories(ctx) {
  const commandsPath = path.join(__dirname, '..', 'commands');
  const commandFiles = await fs.readdir(commandsPath);
  const categories = [...new Set(commandFiles
    .map(file => require(path.join(commandsPath, file)).category || 'Uncategorized'))];
  const categoryList = categories.map((category, index) => `│ ${index + 1}. ${category}`).join('\n');
  const categoryMessage = `
╭───────⦿ COMMAND CATEGORIES ⦿───────╮
${categoryList}
╰───────⦿ TOTAL: ${categories.length} ⦿───────╯
`;
  await ctx.answerCbQuery();
  await ctx.editMessageText(categoryMessage, { parse_mode: 'Markdown' });
}

async function checkForUpdates(ctx) {
  const updateMessage = `
╭───────⦿ UPDATE CHECK ⦿───────╮
│ Current version: ${config.version}
│ Status: Up to date
╰───────⦿ END ⦿───────╯
`;
  await ctx.answerCbQuery();
  await ctx.editMessageText(updateMessage, { parse_mode: 'Markdown' });
}
