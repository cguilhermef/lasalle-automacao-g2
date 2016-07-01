'use strict';

/**
 * @ngdoc service
 * @name webappApp.config
 * @description
 * # config
 * Factory in the webappApp.
 */
angular.module('webappApp')
  .factory('Config', function ($http) {
    return {
      getScriptURL: function(callback) {
        $http
          .get('/config')
            .then(function(response) {
              callback(null, 'http://' + response.data.ipServer + ':3001/script');
            }, function() {
              callback(null, 'http://192.168.0.21:3001/script');
            });
      }
    };
  });
