/*
  DISCLAIMER:

  On develop environment we want the livereload feature, but as we use
  Webpack to budle the code, a development server is required. So Hapi will
  proxy all GUI requests to that dev server. On production environment we can
  serve the compiled GUI code as static path, so this plugin will not be
  necessary.

  +----------+     +----------+     +----------+
  |          |     |          |     |          |
  | Browser  +---> |  Hapi    +---> |  Dev     |
  |          |     |  server  |     |  server  |
  |          |     |          |     |          |
  +----------+     +----+-----+     +----------+
                        |                       
                        |           +----------+
                        |           |          |
                        +---------> |  API     |
                                    |  plugins |
                                    |          |
                                    +----------+

  The diagram above illustrates how this works.
*/

exports.register = function(server, options, next) {
  'use strict';

  var devServer = {
    handler: {
      proxy: {
        host: 'localhost',
        port: 3000,
        passThrough: true
      }
    }
  };

  server.route([{
      method: 'GET',
      path: '/app/{path*}',
      config: devServer
    }, {
      method: 'GET',
      path: '/styles/{path*}',
      config: devServer
    }, {
      method: 'GET',
      path: '/fonts/{path*}',
      config: devServer
    }, {
      method: 'GET',
      path: '/images/{path*}',
      config: devServer
    }, {
      method: 'GET',
      path: '/bower_components/{path*}',
      config: devServer
    }, {
      method: 'GET',
      path: '/scripts/{path*}',
      config: devServer
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'assets-dev-server'
};
