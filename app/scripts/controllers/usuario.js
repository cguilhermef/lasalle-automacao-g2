'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:UsuarioCtrl
 * @description
 * # UsuarioCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('UsuarioCtrl', function (Usuario, $scope, $location) {

    $scope.init = function() {
      if (!$scope.model) { $scope.model = {}; }

      $scope.model.ipServidor = '';
      $scope.filtro = {
        ipServidor: null,
        nomeUsuario: ''
      };

    };

    $scope.buscarUsuario = function() {
      Usuario.getUsuario($scope.filtro.ipServidor, $scope.filtro.nomeUsuario, function(error, data) {
        console.log(data);
      });
    };
  });
