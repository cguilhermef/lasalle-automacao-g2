'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('MainCtrl', function ($rootScope, $scope, Hosts, ngToast) {
    $scope.init = function() {
      if (!$scope.model) { $scope.model = {}; }

      $scope.model.host = {
        hostname: ''
      };
      $scope.model.hosts = [];
      $scope.model.addingHost = false;
    };

    $scope.addHost = function($event) {
      $event.delegateTarget.toggleLoading();
      $scope.model.addingHost = true;
      ngToast.create({
        className: 'success',
        content: '<span class="fa fa-check"></span> Adicionado com sucesso!'
      });
      Hosts.addHost($scope.model.host.hostname, function(error, data) {
        $event.delegateTarget.toggleLoading();
        $scope.model.addingHost = false;
        if (!error) {{
          if (data.content.lost === 100) {
            ngToast.clean();
            ngToast.create({
              className: 'warning',
              content: 'Este host parece estar indisponível',
              timeout: 5000
            });
          }
          $scope.model.hosts.push(data.content);
        }}
      });
    };

    $scope.init();
  });
