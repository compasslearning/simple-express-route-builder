module.exports = function (app) {
  app.get('/', function (req, res) { res.send('GET /bar/'); });
  app.post('/', function (req, res) { res.send('POST /bar/'); });
};