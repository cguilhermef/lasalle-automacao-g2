'use strict';

/**
 * @ngdoc service
 * @name webappApp.usuario
 * @description
 * # usuario
 * Service in the webappApp.
 */
angular.module('webappApp')
  .service('Usuarios', function ($http, $rootScope) {

    var service = this;
    var URL_SCRIPTS = $rootScope.config.URL_SCRIPTS;

    service.getUsuarios = function(ip, criterio, callback) {
      $http.post(URL_SCRIPTS, {
        command: 'users/listarUsuarios',
        params: criterio.length ? [ip, criterio] : [ip]
      }).then(function(response){
        callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };

    service.addUsuario = function(host, data, callback) {
      $http.post(URL_SCRIPTS, {
        command: 'users/cadastrarUsuario',
        params: [host, data.name, data.password, data.shell]
      }).then(function(response){
        callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };

    service.getShells = function(ip, callback) {
      $http.post(URL_SCRIPTS, {
        command: 'users/listarShells',
        params: [ip]
      }).then(function(response){
        callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };

    service.delUsuario = function(ip, name, callback) {
      $http.post(URL_SCRIPTS, {
        command: 'users/removerUsuario',
        params: [ip, name]
      }).then(function(response){
        callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };

    service.editUsuario = function(
      ipHost,
      oldName,
      oldHome,
      newName,
      newHome,
      newShell,
      callback
    ){
      $http.post(URL_SCRIPTS, {
        command: 'users/editarUsuario',
        params: [ipHost, oldName, oldHome, newName, newHome, newShell]
      }).then(function(response){
        callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };
  });
