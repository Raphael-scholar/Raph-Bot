const logger = require('../utils/logger');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    logger.error('Unhandled error:', error);
    await ctx.reply('An unexpected error occurred. Please try again later.');
  }
};
