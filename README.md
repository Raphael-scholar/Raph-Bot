# Raph Bot

Raph Bot is an advanced Telegram bot created by Raphael, designed to provide various useful functionalities to users.

## Features

- 🌤 Weather information
- 🌐 Text translation
- ⏰ Reminders
- And more!

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Telegram Bot Token
- API keys for weather and translation services

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Raphael-scholar/Raph-Bot.git
   cd raph-bot
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   BOT_TOKEN=your_telegram_bot_token_here
   MONGODB_URI=MONGODB_URL
   WEATHER_API_KEY=your_weather_api_key_here
   TRANSLATION_API_KEY=your_translation_api_key_here
   OWNER_ID=your_telegram_user_id_here
   LOG_LEVEL=info
   ```

4. Start the bot:
   ```
   npm start
   ```

## Usage

Once the bot is running, you can interact with it on Telegram by sending commands such as:

- `/start` - Launch the bot and view the main menu
- `/help` - Display help message with available commands
- `/weather <city>` - Get current weather for a city
- `/translate <text>` - Translate text to another language
- `/reminder <time> <message>` - Set a reminder

## Deployment

### Render

1. Fork this repository to your GitHub account.
2. Create a new Web Service on Render.
3. Connect your GitHub repository to Render.
4. Set the following:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add the environment variables from the `.env` file to Render's environment variables section.
6. Deploy the bot.

### Heroku

1. Fork this repository to your GitHub account.
2. Create a new app on Heroku.
3. Connect your GitHub repository to Heroku.
4. Set the following in the Deploy tab:
   - Deployment method: GitHub
   - App connected to GitHub: Select your forked repository
5. In the Settings tab, add the environment variables from the `.env` file to Heroku's Config Vars.
6. Deploy the bot.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
