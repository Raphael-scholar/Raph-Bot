const { Markup } = require('telegraf');
const weatherService = require('../services/weatherService');
const logger = require('../utils/logger');

module.exports = async (ctx) => {
  const city = ctx.message.text.split(' ').slice(1).join(' ');

  if (!city) {
    return ctx.reply('Please provide a city name. Usage: /weather <city>');
  }

  try {
    const weatherData = await weatherService.getWeather(city);
    const message = `
🌍 Weather in ${weatherData.name}, ${weatherData.sys.country}

🌡️ Temperature: ${weatherData.main.temp}°C (Feels like ${weatherData.main.feels_like}°C)
🌤️ Condition: ${weatherData.weather[0].description}
💧 Humidity: ${weatherData.main.humidity}%
💨 Wind: ${weatherData.wind.speed} m/s, ${weatherData.wind.deg}°
🌅 Sunrise: ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
🌇 Sunset: ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}

🔄 Last updated: ${new Date(weatherData.dt * 1000).toLocaleString()}
`;

    const keyboard = Markup.inlineKeyboard([
      Markup.button.callback('🔄 Update', `weather_update_${city}`),
      Markup.button.callback('📊 Detailed Forecast', `weather_forecast_${city}`)
    ]);

    await ctx.reply(message, keyboard);
  } catch (error) {
    logger.error('Error fetching weather:', error);
    await ctx.reply('Sorry, I couldn\'t fetch the weather information. Please try again later.');
  }
};
