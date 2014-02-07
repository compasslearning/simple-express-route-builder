module.exports = function (app) {
  app.get('/', function (req, res) { res.send('GET /'); });
  app.post('/', function (req, res) { res.send('POST /'); });
};