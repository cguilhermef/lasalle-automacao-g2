'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('MainCtrl', function ($scope, Hosts) {
    $scope.init = function() {
      if (!$scope.model) { $scope.model = {}; }

      $scope.model.host = {
        hostname: ''
      };
      $scope.model.hosts = [];
    };

    $scope.addHost = function(hostname) {
      Hosts.addHost(hostname, function(error, data) {
        console.log(error);
        console.log(data);
        if (!error) {{
          $scope.model.hosts.push(data);
        }}
      });
    };

    $scope.init();
  });
