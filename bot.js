console.log("Bot is starting...");
const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

// 🔍 Debug: Check if secrets are loaded
console.log("Bot is starting on GitHub Actions...");
console.log("Checking environment variables...");
console.log("API_KEY exists:", !!process.env.API_KEY);
console.log("API_SECRET exists:", !!process.env.API_SECRET);
console.log("ACCESS_TOKEN exists:", !!process.env.ACCESS_TOKEN);
console.log("ACCESS_SECRET exists:", !!process.env.ACCESS_SECRET);

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
  .then(() => console.log("✅ Tweet sent:", randomTip))
  .catch(error => {
    console.error("❌ Error sending tweet:", error);
    process.exit(1); // force exit with error
  });