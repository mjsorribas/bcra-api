/* jshint node:true,mocha:true,esversion:6,expr:true */
'use strict';
var should = require('chai').should();
var service = require('../lib/bcra-service');
var _ = require('lodash');

describe('bcra-service', function() {

  describe('#dolarReference', function() {
    it('test the dolarReference functin', function() {
      var last = null;
      for(var i in _.range(30)){
        last = service.dolarReference().then(function(data){
          data.should.be.a('number').and.above(10);
        });
      }
      return last;
    });
  });
});
