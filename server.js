const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors:{
    origin: "*"
  }
});
const port = process.env.PORT || 3000;

app.get("/",(req, res, next)=>{
  res.send("heloooooooooooooo");
});

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: '9iawjLbEFzBWNBZ8mtCKoQcY3tb6uRU7k1HbXnNtOrvizGf1vIZolWBOEWxLwewj',
  APISECRET: 'zTm2jMhG7GaS3FYJudOB7ppyEb7PZLISb1WEZPe3EwrDeF47zAuGQPXhzfYtGlbi'
});
var a ="";


//telegram--------------------------------------

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1981812453:AAGjYCAgJ0AM85UHp2XLRlyFgbHSLeRFVaI';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Xin chào: " + msg.from.first_name + " " + msg.from.last_name);
});

bot.onText(/\/price/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Xin chào: " + msg.from.first_name + " " + msg.from.last_name);
  binance.prices('BNBBTC', (error, ticker) => {
    a = ticker.BNBBTC;
    bot.sendMessage(chatId, "$ BNB= " + a);
  });
});


//telegram-------------------------------------

http.listen(port, ()=>{
  console.log("new connection");
});
