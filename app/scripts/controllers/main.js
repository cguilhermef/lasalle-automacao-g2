'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('MainCtrl', function ($scope, Hosts, ngToast ) {
    $scope.init = function() {
      if (!$scope.model) { $scope.model = {}; }
      $scope.model.host = {
        hostname: ''
      };
      $scope.hosts = Hosts.getHosts();
      $scope.model.addingHost = false;
    };

    $scope.addHost = function($event) {
      $event.delegateTarget.toggleLoading();
      $scope.model.addingHost = true;
      Hosts.addHost($scope.model.host.hostname, function(error, data) {
        $event.delegateTarget.toggleLoading();
        $scope.model.addingHost = false;
        ngToast.dismiss();
        if (!error) {
          $scope.model.host.hostname = '';
          if (!data.content.ativo) {
            ngToast.create({
              className: 'warning',
              content: '<span class="fa fa-exclamation-triangle"></span> Este host não está ativo.',
              timeout: 5000
            });
          } else {
            ngToast.dismiss();
            ngToast.create({
              className: 'success',
              content: '<span class="fa fa-check"></span> Host adicionado com sucesso!',
              timeout: 5000
            });
          }
          // $scope.hosts.push(data.content);
        } else {
          if (error.exitCode === 500) {
            ngToast.dismiss();
            ngToast.create({
              className: 'danger',
              content: '<span class="fa fa-ban"></span> ' + error.message,
              timeout: 5000
            });
            return;
          }
        }
      });
    };

    $scope.removeHost = function(ipAddress) {
      Hosts.removeHost(ipAddress, function() {
        $scope.hosts = Hosts.getHosts();
        ngToast.dismiss();
        ngToast.create({
          className: 'success',
          content: '<span class="fa fa-checked"></span> Host removido com sucesso!',
          timeout: 5000
        });
      });
    };

    $scope.init();
  });
