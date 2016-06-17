'use strict';

/**
 * @ngdoc service
 * @name webappApp.backups
 * @description
 * # backups
 * Service in the webappApp.
 */
angular.module('webappApp')
  .service('Backups', function ($http, Config) {

    this.verificarOrigemDestino = function(ipOrigem, ipDestino, callback) {
      $http.post(Config.getScriptURL(), {
        command: 'backup/verificarOrigemDestino',
        params: [ipOrigem, ipDestino]
      }).then(function(response){
          callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };
// /www/g2/sh/scripts/backup/teste.sh
    this.executarBackup = function(ipOrigem, ipDestino, itens, diretorioDestino, callback) {
      var params = [ipOrigem].concat(itens);

      $http.post(Config.getScriptURL(), {
        command: 'backup/prepararArquivos',
        params: params
      }).then(function(response) {
        // callback(null, response);
        if (response.data.exitCode === 0) {
          $http.post(Config.getScriptURL(), {
            command: ['backup/moverBackupParaDestino'],
            params: [ipDestino, diretorioDestino, response.data.content.arquivoGerado]
          }).then(function(response) {
            console.log(response);
          }, function(error) {
            console.log(error);
          });
        }
      }, function(error){
        callback(error);
      });

    };
  });
