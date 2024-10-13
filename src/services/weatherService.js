const axios = require('axios');
const config = require('../config');

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function getWeather(city) {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: config.weatherApiKey,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('City not found');
    }
    throw error;
  }
}

async function getForecast(city) {
  try {
    const response = await axios.get(`${API_BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: config.weatherApiKey,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('City not found');
    }
    throw error;
  }
}

module.exports = {
  getWeather,
  getForecast,
};
