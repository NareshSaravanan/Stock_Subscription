var express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http').Server(app);

app.use(express.static(path.join(__dirname)));

http.listen(3000, function () {
    console.log('listening on: 3000');
});
