/* jshint node:true */
'use strict';
var restify = require('restify');
var bcraService = require('./lib/bcra-service');

var server = restify.createServer();
server.get('/dolar-reference', function(resquest, response, next) {
  bcraService.dolarReference()
    .then(function(data) {
      response.json(200, {
        price: data
      });
      next();
    }, function(error) {
      next(error);
    });
});


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
