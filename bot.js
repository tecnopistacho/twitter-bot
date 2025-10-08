console.log("Bot is starting...");
const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();
const fs = require('fs');

// Load tips from your text file
const tips = fs.readFileSync('tips.txt', 'utf-8').split('\n').filter(Boolean);
console.log("Tips loaded:", tips);

// Pick a random tip
const randomTip = tips[Math.floor(Math.random() * tips.length)];
console.log("Selected tip:", randomTip);

// Connect to Twitter
const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

// Send the tweet
client.v2.tweet(randomTip)
  .then(() => console.log("Tweet sent:", randomTip))
  .catch(error => console.error("Error sending tweet:", error));

