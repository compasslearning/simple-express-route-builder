express-route-builder
=====================

A convention for seperating routes into manageable chunks

## Usage

#### Create a routes folder
I prefer to use routes as the folder.  It should be in the same folder as your express application.

#### Create a folder tree representing the routes

For example:
    Routes
     \ foo
      \ bar

#### Add an index.js to each folder that you want to have routes

#### Add your routes to the index.js file

Use the following format:

    module.exports = function (app) {
      app.get('/', function (req, res) { res.send('GET /'); });
      app.post('/', function (req, res) { res.send('POST /'); });
    };

#### Call route builder in your app.js

    var http = require('http'),
      routeBuilder = require('../index'),
      app = require('express')();

    routeBuilder(app);

    var server = http.createServer(app).listen(7777, function () {
      console.log('Express server listening on port 7777');
    });

#### You are ready to go!

## Running the Example

The example requires that the dev dependencies be installed via npm

    cd example
    node app.js
    Check the routes out via postman or curl




The MIT License (MIT)

Copyright (c) 2013 Compass Learning

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.