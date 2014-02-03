var chai = require('chai'),
  _ = require('lodash'),
  fs = require('fs-extra'),
  express = require('express'),
  app,
  routeBuilder = require('../index.js'),
  defaultPath = './test/routes',
  seedIndexFiles = ['test/routes/index.js',
    'test/routes/foo/index.js',
    'test/routes/bar/index.js',
    'test/routes/foo/bar/index.js'],
  content = ['module.exports = function (app) {',
    '  app.get("/", function (req, res) { res.send("get"); });',
    '  app.post("/", function (req, res) { res.send("post"); });',
    '  app.get("/stuff", function (req, res) { res.send("get: stuff"); });',
    '};'];

content = content.join('\n');

chai.should();

describe('Express Route Builder', function () {

  //Build up the routes folder for testing
  //TODO: switch to a mock
  before(function () {
    _.each(seedIndexFiles, function (file) {
      fs.outputFileSync(file, content);
    });
  });

  //removeSync equal to rm -rf
  after(function () {
    fs.removeSync(defaultPath);
  });

  describe('Result Object', function () {

    before(function () {
      app = routeBuilder(express(), defaultPath);
    });

    it('Should exist', function () {
      app.should.exist;
    });

    it('Should be a function', function () {
      app.should.be.a('function');
    });

    describe('Routes object', function () {
      it('Should exist', function () {
        app.routes.should.exist;
      });

      it('Should be an object', function () {
        app.routes.should.be.an('object');
      });

      it('Should have a get property', function () {
        app.routes.get.should.exist;
      });

      it('Should have a post property', function () {
        app.routes.post.should.exist;
      });

      it('Should have our get routes', function () {
        var expectedRoutes = [
          '/',
          '/stuff',
          '/foo',
          '/foo/stuff',
          '/bar',
          '/bar/stuff',
          '/foo/bar',
          '/foo/bar/stuff'
        ];

        _.pluck(app.routes.get, 'path').should.have.members(expectedRoutes);
      });

      it('Should have our post routes', function () {
        var expectedRoutes = [
          '/',
          '/foo',
          '/bar',
          '/foo/bar'
        ];

        _.pluck(app.routes.post, 'path').should.have.members(expectedRoutes);
      });
    });
  });
});