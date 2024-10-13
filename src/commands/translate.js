const { Markup } = require('telegraf');
const translationService = require('../services/translationService');
const logger = require('../utils/logger');
const config = require('../config');

module.exports = async (ctx) => {
  const text = ctx.message.text.split(' ').slice(1).join(' ');

  if (!text) {
    return ctx.reply('Please provide text to translate. Usage: /translate <text>');
  }

  try {
    const detectedLanguage = await translationService.detectLanguage(text);
    const targetLanguage = detectedLanguage === 'en' ? 'es' : 'en';

    const translation = await translationService.translateText(text, targetLanguage);

    const message = `
🌐 Translation

From: ${detectedLanguage.toUpperCase()}
To: ${targetLanguage.toUpperCase()}

Original: ${text}
Translation: ${translation}
`;

    const keyboard = Markup.inlineKeyboard(
      config.supportedLanguages
        .filter(lang => lang !== detectedLanguage)
        .map(lang => Markup.button.callback(lang.toUpperCase(), `translate_${lang}_${text}`))
    );

    await ctx.reply(message, keyboard);
  } catch (error) {
    logger.error('Error translating text:', error);
    await ctx.reply('Sorry, I couldn\'t translate the text. Please try again later.');
  }
};
