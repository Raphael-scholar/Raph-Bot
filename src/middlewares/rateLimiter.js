const { RateLimiter } = require('limiter');
const config = require('../config');

const limiter = new RateLimiter({
  tokensPerInterval: config.rateLimitMax,
  interval: config.rateLimitWindow,
  fireImmediately: true,
});

module.exports = async (ctx, next) => {
  const remainingRequests = await limiter.removeTokens(1);
  
  if (remainingRequests < 0) {
    return ctx.reply('Rate limit exceeded. Please try again later.');
  }
  
  return next();
};
