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
        if (callback) {
          $http
            .get('/config')
              .then(function(response) {
                callback(null, 'http://' + response.data + ':3001/script');
              }, function(error) {
                callback(error);
              });
        } else {
          return 'http://10.30.2.159:3001/script';
        }
      }
    };
  });
