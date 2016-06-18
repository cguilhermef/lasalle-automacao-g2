'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:UsuarioCtrl
 * @description
 * # UsuarioCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('UsuariosCtrl', function (Usuarios, $scope, Hosts) {

    $scope.init = function() {
      if (!$scope.model) { $scope.model = {}; }

      $scope.model.ipServidor = '';
      $scope.hosts = Hosts.getHosts() || [];
      $scope.filtro = {
        ipServidor: null,
        nomeUsuario: ''
      };
    };

    $scope.buscarUsuario = function() {
      Usuarios.getUsuario($scope.filtro.ipServidor, $scope.filtro.nomeUsuario, function(error, data) {
        console.log(data);
      });
    };
    $scope.init();
  });