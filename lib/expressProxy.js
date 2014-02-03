//Used to man in the middle our express routes
var methods = require('methods'),
  _ = require('lodash'),
  proxy;

//Add in the del alias
methods.push('del');

function Proxy() {
  this.routes = [];

  this.route = function (routePath) {
    this.routes.push(routePath);
  };
}

_.each(methods, function (method) {
  Proxy.prototype[method] = function (path) {
    var args = [method].concat([].slice.call(arguments));

    this.route(args);
  };
});

exports.init = function () {
  return new Proxy();
};
