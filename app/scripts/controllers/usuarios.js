'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:UsuarioCtrl
 * @description
 * # UsuarioCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('UsuariosCtrl', function (Usuarios, $scope, Hosts, ngToast, _) {

    $scope.init = function() {
      if (!$scope.model) { $scope.model = {}; }

      $scope.model.ipServidor = '';
      $scope.model.hosts = Hosts.getHosts();
      $scope.running = false;
      $scope.editing = false;
      $scope.filtro = {
        ipHost: null,
        nomeUsuario: ''
      };
      $scope.model.edit = {
        ipHost: null,
        nome: '',
        senha: '',
        bash: ''
      };
      $scope.model.users = [];
      $scope.shells = [];
    };

    $scope.buscarUsuario = function($event) {
      if (!$scope.filtro.ipHost) {
        ngToast.dismiss();
        ngToast.create({
          className: 'danger',
          content: '<span class="fa fa-ban fa-2x v-align-m"></span> É necessário informar o host!',
          timeout: 4000
        });
        return;
      }
      $event.delegateTarget.toggleLoading();
      $scope.running = true;
      ngToast.dismiss();
      ngToast.create({
        className: 'warning',
        content: '<span class="fa fa-clock-o fa-2x v-align-m pulsing"></span> Buscando usuários...',
        dismissOnTimeout: false,
        dismissOnClick: false
      });

      Usuarios.getUsuarios($scope.filtro.ipHost, function(error, data) {
        $event.delegateTarget.toggleLoading();
        $scope.running = false;
        ngToast.dismiss();
        if (error || data.content.exitCode === 500 ) {
          ngToast.create({
            className: 'danger',
            content:'<span class="fa fa-ban fa-2x v-align-m"></span> Ocorreu um erro!',
            timeout: 4000
          });
          return;
        }
        $scope.model.users = _
          .chain(data.content.usuarios)
          .cloneDeep()
          .map(function(v){
            return {name: v};
          }).value();
        ngToast.create({
          className: 'success',
          content:'<span class="fa fa-check fa-2x v-align-m"></span> Executado com sucesso!',
          timeout: 4000
        });
      });

    };

    $scope.adicionarUsuario = function($event) {
      if ($scope.frmUsuarioAdd.$invalid ) {
        ngToast.dismiss();
        ngToast.create({
          className: 'danger',
          content: '<span class="fa fa-ban fa-2x v-align-m"></span> Preencha todos os campos!',
          timeout: 4000
        });
        return;
      }
      $event.delegateTarget.toggleLoading();
      $scope.running = true;
      ngToast.dismiss();
      ngToast.create({
        className: 'warning',
        content: '<span class="fa fa-clock-o fa-2x v-align-m pulsing"></span> Buscando usuários...',
        dismissOnTimeout: false,
        dismissOnClick: false
      });

      Usuarios.addUsuario(
        $scope.model.edit,
        function(error, data) {
        $event.delegateTarget.toggleLoading();
        $scope.running = false;
        ngToast.dismiss();
        if (error || data.content.exitCode === 500 ) {
          ngToast.create({
            className: 'danger',
            content:'<span class="fa fa-ban fa-2x v-align-m"></span> Ocorreu um erro!',
            timeout: 4000
          });
          return;
        }
        $scope.model.edit = {};
        ngToast.create({
          className: 'success',
          content:'<span class="fa fa-check fa-2x v-align-m"></span>' + data.content.message,
          timeout: 4000
        });
      });
    };
    $scope.refreshShells = function() {
      $scope.running = true;
      Usuarios.getShells($scope.model.edit.ipHost, function(error, data){
        $scope.running = false;
        if (error) {
          $scope.shells = [];
          return;
        }
        $scope.shells = data.content.shells;
      });
    };
    $scope.init();
  });
