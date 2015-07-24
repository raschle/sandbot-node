var express = require('express'),
    path = require('path'),
    http = require('http'),
    queue = require('./routes/queue'),
    move = require('./routes/move'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    static = require('serve-static');

    // fuer raspberry
    //gpio = require('pi-gpio');

global.CurrentUserId = 0;
global.ControlTime = 15;// [s]

var app = express();


app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({
//    extended: true
//}));

app.use(static(path.join(__dirname, 'public')));


app.get('/api/queue', queue.getAll);
app.get('/api/queue/:id', queue.refreshReservation);
app.post('/api/queue', queue.addQueue);
app.get('/api/move/:action/:id', move.moveRobot);

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});