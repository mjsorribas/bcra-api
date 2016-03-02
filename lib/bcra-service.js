/* jshint node:true */
'use strict';
var bcra = require('bcra-cotization');
var q = require('q');
var nodeCache = require('node-cache');
var _ = require('lodash');

var cache = new nodeCache({
  stdTTL: 300,
  checkperiod: 150
});

function checkData(data, index, attribute) {
  index = index || 0;

  if (!_.isArray(data))
    return false;

  if (data.length < index)
    return false;

  if (!_.isObject(data[index]))
    return false;

  if (_.isString(attribute) && !_.has(data[index], attribute))
    return false;

  return true;
}

exports.dolarReference = function(callback) {
  var deferred = q.defer();

  cache.get('bcra-data',
    function(error, data) {
      if (checkData(data, 0, 'reference')) {
        deferred.resolve(data[0].reference);
        return;
      }

      bcra.cotization()
        .then(
          function(data) {
            if (checkData(data, 0, 'reference')) {
              deferred.resolve(data[0].reference);
              cache.set('bcra-data', data);
            } else {
              deferred.reject(new Error("Error 01"));
            }
          },
          function(error) {
            deferred.reject(error);
          });
    }
  );

  deferred.promise.nodeify(callback);
  return deferred.promise;
};
