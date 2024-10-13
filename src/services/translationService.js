const axios = require('axios');
const config = require('../config');

const API_BASE_URL = 'https://translation.googleapis.com/language/translate/v2';

async function translateText(text, targetLanguage) {
  try {
    const response = await axios.post(API_BASE_URL, null, {
      params: {
        q: text,
        target: targetLanguage,
        key: config.translationApiKey,
      },
    });
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    throw new Error('Translation failed');
  }
}

async function detectLanguage(text) {
  try {
    const response = await axios.post(`${API_BASE_URL}/detect`, null, {
      params: {
        q: text,
        key: config.translationApiKey,
      },
    });
    return response.data.data.detections[0][0].language;
  } catch (error) {
    throw new Error('Language detection failed');
  }
}

module.exports = {
  translateText,
  detectLanguage,
};
