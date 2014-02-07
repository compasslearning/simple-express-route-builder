module.exports = function (app) {
  app.get('/', function (req, res) { res.send('GET /foo/'); });
  app.post('/', function (req, res) { res.send('POST /foo/'); });
};