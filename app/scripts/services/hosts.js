'use strict';

/**
 * @ngdoc service
 * @name webappApp.Host
 * @description
 * # Host
 * Service in the webappApp.
 */
angular.module('webappApp')
  .service('Hosts', function ($http, $localStorage, _, $rootScope) {
    var service = this;
    var URL_SCRIPTS = $rootScope.config.URL_SCRIPTS;

    this.statusIp = function(ipAddress, callback) {
      $http.post(URL_SCRIPTS, {
        command: 'ipStatus',
        params: [ipAddress]
      }).then(function(response){
          callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };

    this.getHosts = function() {
      if (!$localStorage.db) {
        $localStorage.db = {
          hosts: []
        };
      }
      return $localStorage.db.hosts;
    };

    this.removeHost = function(ipAddress, callback) {
      // $localStorage.hosts = _.omit($localStorage.hosts, {ip: ipAddress});
      $localStorage.db.hosts = _.reject($localStorage.db.hosts, {ip: ipAddress});
      if (callback) {
        callback();
      }
    };
    this.addHost = function(ipAddress, callback) {
      service.statusIp(ipAddress, function(error, data) {
        if (!error && data.exitCode === 0) {
          if (!$localStorage.db) {
            $localStorage.db = {
              hosts: []
            };
          }
          $localStorage.db.hosts.push(data.content);
          callback(error, data);
        } else {
          callback(data);
        }
      });
    };

  });
