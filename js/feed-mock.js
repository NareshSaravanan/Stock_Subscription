feed = (function () {

    var watchList = [];

    var stocks = [
        {code: "ABT",companyName:"Abbott Laboratories", open: 38.87},
        {code: "G00G",companyName:"Alphabet", open: 25.40},
        {code: "BDX",companyName:"Becton Dickinson", open: 97.05},
        {code: "CVS",companyName:"CVS", open: 69.45},
        {code: "XOM",companyName:"ExxonMobil", open: 83.24},
        {code: "JNJ",companyName:"Johnson & Johnson", open: 55.76},
        {code: "LOW",companyName:"Lowe's", open: 76.12},
        {code: "MSFT",companyName:"Microsoft", open: 61.75},
        {code: "SFM",companyName:"Sprouts Farmers Market", open: 15.84},
        {code: "UTX",companyName:"United Technologies", open: 154.50}
    ];

    stocks.forEach(function(stock) {
        stock.last = stock.open;
        stock.high = stock.open;
        stock.low = stock.open;
    });

    return {
        onChange: function(callback) {
            setInterval(function() {
                var index = Math.floor(Math.random() * stocks.length),
                    stock = stocks[index],
                    maxChange = stock.open * 0.005,
                    change = maxChange - Math.random() * maxChange * 2,
                    last;

                change = Math.round(change * 100) / 100;
                change = change === 0 ? 0.01 : change;

                last = stock.last + change;

                if (last > stock.open * 1.15 || last < stock.open * 0.85)
                {
                    change = -change;
                    last = stock.last + change;
                }

                stock.change = change;
                stock.last = Math.round(last * 100) / 100;
                if (stock.last > stock.high) {
                    stock.high = stock.last;
                }
                if (stock.last < stock.low) {
                    stock.low = stock.last;
                }
                if (watchList.indexOf(stock.code) > -1) {
                    callback(stock);
                }
            }, 200);
        },
        watch: function(symbols) {
            console.log(symbols);
            symbols.forEach(function(symbol) {
                if (watchList.indexOf(symbol) < 0) {
                    watchList.push(symbol);
                }
            });
        },
        unwatch: function(symbol) {
            var index = watchList.indexOf(symbol);
            if (index > -1) {
                watchList.splice(index, 1);
            }
        }
    };

}());
