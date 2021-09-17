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
binance.prices('BNBBTC', (error, ticker) => {
  a = ticker.BNBBTC;
  console.info("Price of BNB: ", ticker.BNBBTC);
});

//telegram--------------------------------------

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1981812453:AAGjYCAgJ0AM85UHp2XLRlyFgbHSLeRFVaI';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "$ BNB= " + a);
});

//telegram-------------------------------------

http.listen(port, ()=>{
  console.log("new connection");
});
