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

    this.statusIp = function(ipAddress, callback) {
      $http.post('http://ubuntutres:3000/script', {
        command: 'ipStatus',
        params: [ipAddress]
      }).then(function(response){
          callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };

    this.addHost = function(ipAddress, callback) {
      service.statusIp(ipAddress, function(error, data) {
        callback(error, data);
      });
    };

  });
