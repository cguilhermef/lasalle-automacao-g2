'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('MainCtrl', function ($scope) {
    $scope.init = function() {
      if (!$scope.model) { $scope.model = {}; }

      $scope.model.host = {
        hostname: ''
      };
      $scope.model.hosts = [];
    };

    $scope.init();
  });
