'use strict';

/**
 * @ngdoc service
 * @name webappApp.usuario
 * @description
 * # usuario
 * Service in the webappApp.
 */
angular.module('webappApp')
  .service('Usuarios', function ($http, Config) {

    var service = this;

    service.getUsuarios = function(ip, callback) {
      $http.post(Config.getScriptURL(), {
        command: 'users/listarUsuarios',
        params: [ip]
      }).then(function(response){
        callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };

    service.addUsuario = function(data, callback) {
      $http.post(Config.getScriptURL(), {
        command: 'users/cadastrarUsuario',
        params: [data.ipHost, data.nome, data.senha, '/bin/bash']
      }).then(function(response){
        callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };

    service.getShells = function(ip, callback) {
      $http.post(Config.getScriptURL(), {
        command: 'users/listarShells',
        params: [ip]
      }).then(function(response){
        callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };
  });
