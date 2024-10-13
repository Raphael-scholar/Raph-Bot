const mongoose = require('mongoose');
const logger = require('./logger');

const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  firstName: String,
  lastName: String,
  username: String,
  languageCode: String,
  createdAt: { type: Date, default: Date.now },
  lastInteraction: Date,
});

const reminderSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  time: { type: Date, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);
const Reminder = mongoose.model('Reminder', reminderSchema);

async function saveUser(userData) {
  try {
    const user = new User(userData);
    await user.save();
    logger.info(`User saved: ${user.userId}`);
    return user;
  } catch (error) {
    logger.error('Error saving user:', error);
    throw error;
  }
}

async function getUser(userId) {
  try {
    return await User.findOne({ userId });
  } catch (error) {
    logger.error('Error getting user:', error);
    throw error;
  }
}

async function saveReminder(reminderData) {
  try {
    const reminder = new Reminder(reminderData);
    await reminder.save();
    logger.info(`Reminder saved: ${reminder._id}`);
    return reminder;
  } catch (error) {
    logger.error('Error saving reminder:', error);
    throw error;
  }
}

async function getReminders(userId) {
  try {
    return await Reminder.find({ userId, completed: false }).sort('time');
  } catch (error) {
    logger.error('Error getting reminders:', error);
    throw error;
  }
}

async function completeReminder(reminderId) {
  try {
    const reminder = await Reminder.findByIdAndUpdate(reminderId, { completed: true }, { new: true });
    logger.info(`Reminder completed: ${reminderId}`);
    return reminder;
  } catch (error) {
    logger.error('Error completing reminder:', error);
    throw error;
  }
}

async function deleteReminder(reminderId) {
  try {
    await Reminder.findByIdAndDelete(reminderId);
    logger.info(`Reminder deleted: ${reminderId}`);
  } catch (error) {
    logger.error('Error deleting reminder:', error);
    throw error;
  }
}

module.exports = {
  saveUser,
  getUser,
  saveReminder,
  getReminders,
  completeReminder,
  deleteReminder,
};
