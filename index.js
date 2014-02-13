//Note:  This operation is Synchronous.  It should only be run on Express app setup.
var _ = require('lodash'),
  path = require('path'),
  getFileTreeSync = require('./lib/getFileTreeSync'),
  expressProxy = require('./lib/expressProxy');

var buildRoutes = function (app, dir) {
  if (!dir) {
    dir = './routes';
  }

  var filter = function (file) {
      return (/index\.js$/).test(file);
    },
    indexes = getFileTreeSync(dir, filter);

  _.each(indexes, function (index) {
    var proxy = expressProxy.init();

    //convert any slashes in windows to be of the linux / url variety
    index = index.replace('\\', '/');

    //Using process.cwd() to get the route of our folder where our routes folder should be
    require(path.normalize(process.cwd() + '/' + index))(proxy);

    _.each(proxy.routes, function (route) {
      var method = route[0],
        routeData = route.splice(1),
        routePrepend = index,
        newPath = routeData[0];

      //Make our routes like our folder structure
      //Get rid of index.js
      routePrepend = routePrepend.slice(0, -8);

      //Get rid of path
      routePrepend = routePrepend.replace(path.normalize(dir), '');

      if (routePrepend[routePrepend.length - 1] === '/') {
        routePrepend = routePrepend.slice(0, -1);
      }

      //Add the folder prepend
      newPath = routePrepend + newPath;

      //fixes window issue where path's escape forwardslash with a backslash
      newPath = newPath.replace(/\\\//g, '/');

      //Strip trailing / if length is not one
      if (newPath.length > 1 && newPath[newPath.length - 1] === '/') {
        newPath = newPath.slice(0, -1);
      }

      routeData[0] = newPath;

      app[method].apply(app, routeData);
    });
  });

  return app;
};

module.exports = buildRoutes;
