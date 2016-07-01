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

      $scope.model.ipHost = '';
      $scope.model.hosts = Hosts.getHosts();
      $scope.running = false;
      $scope.editing = false;
      $scope.mode = 'adding';
      $scope.model.add = {
        ipHost: null,
        nome: '',
        senha: '',
        bash: ''
      };
      $scope.model.users = [];
      $scope.shells = [];
      $scope.model.find = {
        name: ''
      };
    };

    $scope.refresh = function() {
      $scope.model.add = {};
      $scope.model.edit = {};
      $scope.model.users = [];
      $scope.model.find = {
        name: ''
      };
      $scope.running = true;
      Usuarios.getShells($scope.model.ipHost, function(error, data){
        $scope.running = false;
        if (error) {
          $scope.shells = [];
          return;
        }
        $scope.shells = data.content.shells;
      });
    };

    $scope.buscarUsuario = function($event) {
      $event.delegateTarget.toggleLoading();
      $scope.running = true;
      ngToast.dismiss();
      ngToast.create({
        className: 'warning',
        content: '<span class="fa fa-clock-o fa-2x v-align-m pulsing"></span> Buscando usuários...',
        dismissOnTimeout: false,
        dismissOnClick: false
      });

      Usuarios.getUsuarios($scope.model.ipHost, $scope.model.find.name, function(error, data) {
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
        $scope.model.find.name = '';
        $scope.model.users = _
          .chain(data.content.usuarios)
          .cloneDeep().value();
        ngToast.create({
          className: 'success',
          content:'<span class="fa fa-check fa-2x v-align-m"></span> Executado com sucesso!',
          timeout: 4000
        });
      });

    };

    $scope.adicionarUsuario = function($event) {
      if ( !$scope.model.edit.name || !$scope.model.edit.password || !$scope.model.edit.shell ) {
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
        $scope.model.ipHost,
        $scope.model.edit,
        function(error, data) {
        $event.delegateTarget.toggleLoading();
        $scope.running = false;
        $scope.editing = false;
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
    $scope.editarUsuario = function($index) {
      var user = JSON.parse( JSON.stringify( $scope.model.users[$index] ) );
      var temp = JSON.parse( JSON.stringify(user) );
      $scope.editing = [$index, temp];
      $scope.mode = 'editing';
      $scope.model.edit = user;
    };
    $scope.salvarUsuario = function(newUser, $event) {
      if ( !newUser.name || !newUser.shell || !newUser.home ) {
        ngToast.dismiss();
        ngToast.create({
          className: 'danger',
          content: '<span class="fa fa-ban fa-2x v-align-m"></span> Preencha todos os campos!',
          timeout: 4000
        });
        return;
      }
      $scope.running = true;
      if (window.confirm('Estas alterações não podem ser desfeitas. Deseja mesmo continuar?')) {
        $event.delegateTarget.toggleLoading();
        $scope.running = true;
        ngToast.dismiss();
        ngToast.create({
          className: 'warning',
          content: '<span class="fa fa-clock-o fa-2x v-align-m pulsing"></span> Aplicando alterações...',
          dismissOnTimeout: false,
          dismissOnClick: false
        });
        var oldUser = $scope.editing[1];
        Usuarios.editUsuario(
          $scope.model.ipHost,
          oldUser.name,
          oldUser.home,
          newUser.name,
          newUser.home,
          newUser.shell, function(error, data) {
            if ( data.exitCode === 0 ) {
              $event.delegateTarget.toggleLoading();
              ngToast.dismiss();
              ngToast.create({
                className: 'success',
                content: '<span class="fa fa-check fa-2x v-align-m"></span>' + data.content.message,
                timeout: 4000
              });
              $scope.mode = 'adding';
              $scope.running = false;
              $scope.model.edit = {};
              $scope.model.users[$scope.editing[0]] = data.content.user;
              $scope.editing = false;
              return;
            }
            $scope.mode = 'adding';
            $scope.running = false;
            $scope.model.edit = {};
            ngToast.dismiss();
            ngToast.create({
              className: 'danger',
              content: '<span class="fa fa-ban fa-2x v-align-m"></span>' + data.content.message,
              dismissOnTimeout: false,
              dismissOnClick: true
            });
          });
      }
      $scope.running = false;
    };
    $scope.cancelarEdicao = function() {
      $scope.mode = 'adding';
      $scope.running = false;
      $scope.editing = false;
      $scope.model.edit = {};
    };
    $scope.excluirUsuario = function($event, $index) {
      if (window.confirm('Estas alterações não podem ser desfeitas. Deseja mesmo continuar?')) {
        $event.delegateTarget.toggleLoading();
        $scope.running = true;
        ngToast.dismiss();
        ngToast.create({
          className: 'warning',
          content: '<span class="fa fa-clock-o fa-2x v-align-m pulsing"></span> Excluindo usuário...',
          dismissOnTimeout: false,
          dismissOnClick: false
        });
        Usuarios.delUsuario( $scope.model.ipHost, $scope.model.users[$index].name, function(error, data) {
            $event.delegateTarget.toggleLoading();
            $scope.running = false;
            if (!error && data.exitCode === 0) {
              $scope.model.users = _.omit($scope.model.users, $index);
              ngToast.dismiss();
              ngToast.create({
                className: 'success',
                content: '<span class="fa fa-check fa-2x v-align-m"></span>' + data.content.message,
                timeout: 4000
              });
              return;
            }
            ngToast.dismiss();
            ngToast.create({
              className: 'danger',
              content: '<span class="fa fa-ban fa-2x v-align-m"></span>' + data.content.message,
              dismissOnTimeout: false,
              dismissOnClick: true
            });
        });
      }
    };
    $scope.init();
  });
