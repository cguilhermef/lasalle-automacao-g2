'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('SidebarCtrl', function ($rootScope, $scope, $location) {
    $rootScope.$on('$routeChangeStart', function() {
      $scope.rota = $location.path();
    });
  });
