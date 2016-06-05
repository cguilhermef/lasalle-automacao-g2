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
      $http.post('http://ubuntutres:3000/script', {
        command: 'accessibleHost',
        params: [hostname]
      }).then(function(error, data){
        if (!error) {
          callback(null, data);
        } else {
          callback(error);
        }
      }, function(error) {
        callback(error);
      });
    };

    this.addHost = function(hostname, callback) {
      service.accessible(hostname, function(error, data) {
        callback(error, data);
      });
    };

  });
