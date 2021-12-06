const express = require("express");
const main = require("./main");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*"
  }
});
const port = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.send("heloooooooooooooo");
});



//telegram--------------------------------------

tele = new main();
const TelegramBot = require('node-telegram-bot-api');
process.env.NTBA_FIX_319 = 1;
const token = '1981812453:AAGjYCAgJ0AM85UHp2XLRlyFgbHSLeRFVaI';
const bot = new TelegramBot(token, {
  polling: true
});

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Xin chào: " + msg.from.first_name + " " + msg.from.last_name);
});

bot.onText(/\/(.+)/, (msg, match) => {
  var symb = match[1].toString().toUpperCase();
  tele.getPrice(symb, msg, match, bot);
});

bot.onText(/\/rsi (.+)/, async (msg, match) => {
  var symbol = match[1].toString().toUpperCase() + "USDT";
  await tele.getRsi(msg, symbol, bot);
});

bot.onText(/\/check (.+)/, async (msg, match) => {
  var symbol = match[1].toString().toUpperCase() + "/USDT";
  let a = async function(){
    const bb = require('trading-indicator').bb
     let bbData = await bb(50, 2, "close", "binance", symbol, "1h", true)
     console.log(bbData[bbData.length - 2])
     bot.sendMessage(msg.chat.id,
      "chỉ số bollingerband của " + symbol + "\n" +
      "upper:" + bbData[bbData.length - 2].upper + "\n" +
     "middle:"+ bbData[bbData.length - 2].middle + "\n" +
     "lower:"+ bbData[bbData.length - 2].lower + "\n" +
     "pb:"+ bbData[bbData.length - 2].pb
   );
  }
  setInterval(a, 5000);
});
//quá mua quá bán alert
bot.onText(/\/rsi/, async (msg, match) => {
  tele.getRsiBuySell(msg, bot);
});
//telegram-------------------------------------

http.listen(port, () => {
  console.log("new connection...");
});
