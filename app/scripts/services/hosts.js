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
    var service = this;

    service.model = {
      hosts: []
    };

    this.accessible = function(hostname, callback) {
      $http.get('http://ubuntutres:3000?command=accessibleHost&params=[' + hostname + ']', function(error, data) {
        if (!error) {
          callback(null, data);
        } else {
          callback(error);
        }
      });
    };

    this.addHost = function(hostname, callback) {
      service.accessible(hostname, function(error, data) {
        callback(error, data);
      });
    };

  });
