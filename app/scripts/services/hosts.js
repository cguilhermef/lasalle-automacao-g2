'use strict';

/**
 * @ngdoc service
 * @name webappApp.Host
 * @description
 * # Host
 * Service in the webappApp.
 */
angular.module('webappApp')
  .service('Hosts', function ($http) {

    this.accessible = function(hostname, callback) {
      $http.get('http://ubuntutres:3000?command=accessibleHost&hostname=' + hostname, function(error, data) {
        if (!error) {
          callback(null, data);
        } else {
          callback(error);
        }
      });
    };

  });
