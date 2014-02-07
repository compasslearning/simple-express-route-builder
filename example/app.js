var http = require('http'),
  routeBuilder = require('../index'),
  app = require('express')();

routeBuilder(app);

var server = http.createServer(app).listen(7777, function () {
  console.log('Express server listening on port 7777');
});
