module.exports = function() {

  //---------------------------------------------------------------------------------------------
  var arrobj = [];
  //----------------------------------------------------------------------------------------------

  const Binance = require('node-binance-api');
  const binance = new Binance().options({
    APIKEY: '9iawjLbEFzBWNBZ8mtCKoQcY3tb6uRU7k1HbXnNtOrvizGf1vIZolWBOEWxLwewj',
    APISECRET: 'zTm2jMhG7GaS3FYJudOB7ppyEb7PZLISb1WEZPe3EwrDeF47zAuGQPXhzfYtGlbi'
  });
  //----------------------------------------------------------------------------------------------

  this.getPrice = async function(symbol_name, msg, match, bot) {
    sb = symbol_name + 'USDT';
    const ticker = await binance.prices(sb);
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Xin chào: " + msg.from.first_name + " " + msg.from.last_name);
    bot.sendMessage(chatId, "$ " + symbol_name + "/USDT= " + Object.values(ticker)[0] + "$");
  };

  //----------------------------------------------------------------------------------------------


  // this.getRsi = async function(msg, symbol_name, bot) {
  //   const chatId = msg.chat.id;
  //   sb = symbol_name + 'USDT';
  //   binance.candlesticks(sb, "1d", (error, ticks, symbol) => {
  //     //console.info("candlesticks()", ticks);
  //     for (var i = 0; i < 14; i++) {
  //       arrobj.push(new data(ticks[i][1], ticks[i][2], ticks[i][3], ticks[i][4]));
  //     }
  //
  //
  //   }, {
  //     limit: 14
  //   });
  //
  //   const rsi = await calRsi(arrobj)
  //   bot.sendMessage(chatId, "RSI: " + rsi);
  //
  // };

  this.getRsi = async function(msg, symbol_name, bot) {
    const chatId = msg.chat.id;
    sb = symbol_name + 'USDT';
    await test(sb).then((data)=>{
      console.log(data);
    });

    console.log("2222");


  };

  async function test(sb) {
    await binance.candlesticks(sb, "1d", (error, ticks, symbol) => {
      //console.info("candlesticks()", ticks);
      for (var i = 0; i < 14; i++) {
        arrobj.push(new data(ticks[i][1], ticks[i][2], ticks[i][3], ticks[i][4]));
      }
      console.log("333");
    }, {
      limit: 14
    });
  }

};
//---------------------------------------------------------------------------------------------


function calRsi(arrobj) {
  var sum_close_up = 0;
  var sum_close_dow = 0;
  var rsi = 0;
  for (var i = 0; i < 14; i++) {
    if ((arrobj[i].getClose - arrobj[i].getOpen) >= 0) {
      sum_close_up = sum_close_up + arrobj[i].getClose;
    } else {
      sum_close_dow = sum_close_dow + arrobj[i].getClose;
    }
  }
  rsi = 100 - (100 / (1 + (sum_close_up / sum_close_dow)));
  return rsi;

}

//----------------------------------------------------------------------------------------------
class data {

  constructor(open, high, low, close) {
    this.open = parseFloat(open);
    this.high = parseFloat(high);
    this.low = parseFloat(low);
    this.close = parseFloat(close);
  }
  get getOpen() {
    return this.open;
  }
  get getClose() {
    return this.close;
  }

}
//-----------------------------------------------------------------------------------------------
