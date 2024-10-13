const moment = require('moment');

function formatDate(date) {
  return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

function truncateString(str, maxLength) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function escapeMarkdown(text) {
  return text.replace(/[_*[\]()~`>#+-=|{}.!]/g, '\\$&');
}

module.exports = {
  formatDate,
  capitalizeFirstLetter,
  generateUniqueId,
  truncateString,
  isValidUrl,
  escapeMarkdown,
};
