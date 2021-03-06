module.exports = function() {


  //----------khai bao ket noi san binance

  const Binance = require('node-binance-api');
  const binance = new Binance().options({
    APIKEY: '9iawjLbEFzBWNBZ8mtCKoQcY3tb6uRU7k1HbXnNtOrvizGf1vIZolWBOEWxLwewj',
    APISECRET: 'zTm2jMhG7GaS3FYJudOB7ppyEb7PZLISb1WEZPe3EwrDeF47zAuGQPXhzfYtGlbi'
  });
  //--------ham xu ly lenh /BTC

  this.getPrice = async function(symbol_name, msg, match, bot) {
    sb = symbol_name + 'USDT';
    const ticker = await binance.prices(sb);
    await bot.sendMessage(msg.chat.id, "Xin chào: " + msg.from.first_name + " " + msg.from.last_name);
    await bot.sendMessage(msg.chat.id, "$ " + symbol_name + "/USDT= " + Object.values(ticker)[0] + "$");
  };

  //-----------handle exeption
  process.on('unhandledRejection', (reason, promise) => {});

  //--------------ham xu ly lenh /rsi BTC

  this.getRsi = async function(msg, symbol, bot) {
    let obj = await this.getBinanceCandles(symbol);
    let rsi = await calRsi(obj);
    await bot.sendMessage(msg.chat.id, "Xin chào: " + msg.from.first_name + " " + msg.from.last_name);
    await bot.sendMessage(msg.chat.id, "RSI-14: " + symbol + " :" + rsi);
    let ticker = await binance.prices();
    var arr = [];
    for (let i = 0; i < Object.keys(ticker).length; i++) {
      if (/(.+)\USDT/.test(Object.keys(ticker)[i].toString())) {
        arr.push(Object.keys(ticker)[i]);
      }
    }
    console.log(arr);
  };

  //--------------ham xu ly lenh rsi quá mua quá bán
  this.getRsiBuySell = async function(msg, bot) {
    let ticker = await binance.prices();
    var arr = [];
    for (let i = 0; i < Object.keys(ticker).length; i++) {
      if (/(.+)\USDT/.test(Object.keys(ticker)[i].toString())) {
        arr.push(Object.keys(ticker)[i]);
      }
    }

    let a = async function(){
      alerts = require('trading-indicator').alerts
      for (let i = 0; i < arr.length; i++) {
      try {   let x = await alerts.rsiCheck(14, 70, 30, 'binance', arr[i], '1d', false);
              await bot.sendMessage(msg.chat.id, i + " Cặp Tiền : " + arr[i] + "\n"+
              "Quá Mua: " + x.overBought + "\n" +
              "Quá Bán: " + x.overSold + "\n" +
              "Rsi: " + x.rsiVal + "\n"
          );
      } catch (e) {
      }
    }
  }
    setTimeout(a, 1);
    setInterval(a, 1800000);
  };

  //-------------- lay data 14 cay nen truoc do

  this.getBinanceCandles = async function(symbol) {
    return new Promise((resolve, reject) => {
      binance.candlesticks(symbol, "1d", async (error, ticks, symbol) => {
        if (error) {
          reject(error);
        }
        const candleData = await ticks.map(candle => ({
          open: candle[1],
          high: candle[2],
          low: candle[3],
          close: candle[4]
        }))
        //console.log(candleData);
        resolve(candleData)
      }, {
        limit: 14
      })
    })
  }

};

//---------------- tinh toan chi so RSI
let calRsi = async function(obj) {
  return new Promise((resolve, reject) => {
    var sum_close_up = 0;
    var sum_close_dow = 0;
    var rsi = 0;
    for (var i = 0; i < 14; i++) {
      if ((parseFloat(obj[i]["close"]) - parseFloat(obj[i]["open"])) >= 0) {
        sum_close_up = sum_close_up + parseFloat(obj[i]["close"]);
      } else {
        sum_close_dow = sum_close_dow + parseFloat(obj[i]["close"]);
      }
    }
    rsi = 100 - (100 / (1 + (sum_close_up / sum_close_dow)));
    resolve(rsi)
  });
}
