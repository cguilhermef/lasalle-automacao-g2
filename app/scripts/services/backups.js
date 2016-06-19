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
    this.executarBackup = function(ipOrigem, ipDestino, itens, callback) {
      var params = [ipOrigem, ipDestino].concat(itens);

      $http.post(Config.getScriptURL(), {
        command: 'backup/executarBackup',
        params: params
      }).then(function(response) {
        callback(null, response.data);
        // if (response.data.exitCode === 0) {
        //   console.log(response);
        // }
      }, function(error){
        callback(error);
      });

    };
  });
