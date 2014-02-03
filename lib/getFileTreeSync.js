var fs = require('fs'),
  path = require('path'),
  _ = require('lodash');

var getFileTreeSync = function (dir, filter) {
  var list = [],
    files;

  if (typeof filter !== 'function') {
    filter = function () { return true; };
  }

  files = fs.readdirSync(dir);

  _.each(files, function (file) {
    var checkPath = path.join(dir, file);
    var stat = fs.statSync(checkPath);

    if (stat.isDirectory()) {
      list = list.concat(getFileTreeSync(checkPath, filter));
    } else {
      if (filter(checkPath)) {
        list.push(checkPath);
      }
    }
  });

  return list;
};

module.exports = getFileTreeSync;
