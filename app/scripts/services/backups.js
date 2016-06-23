'use strict';

/**
 * @ngdoc service
 * @name webappApp.backups
 * @description
 * # backups
 * Service in the webappApp.
 */
angular.module('webappApp')
  .service('Backups', function ($http, Config, _) {

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
      }, function(error){
        callback(error);
      });
    };

    this.getListaBackups = function(callback) {
      $http.post(Config.getScriptURL(), {
        command: 'backup/listaBackups'
      }).then(function(response) {
        callback(null, response.data.content.backups);
      }, function(error){
        callback(error);
      });
    };

    this.getDropHoras = function(callback) {
      var tmp = _.range(0,24);
      callback(null, ['*'].concat(tmp));
    };
    this.getDropMinutos = function(callback) {
      var tmp = _.range(0,60);
      callback(null, ['*'].concat(tmp));
    };
    this.getDropDias = function(callback) {
      var tmp = _.range(1,32);
      callback(null, ['*'].concat(tmp));
    };
    this.getDropMeses = function(callback) {
      callback(null, [
        { value: '*', name: 'Todos os meses'},
        { value: '1', name: 'janeiro'},
        { value: '2', name: 'fevereiro'},
        { value: '3', name: 'março'},
        { value: '4', name: 'abril'},
        { value: '5', name: 'maio'},
        { value: '6', name: 'junho'},
        { value: '7', name: 'julho'},
        { value: '8', name: 'agosto'},
        { value: '9', name: 'setembro'},
        { value: '10', name: 'outubro'},
        { value: '11', name: 'novembro'},
        { value: '12', name: 'dezembro'}
      ]);
    };
    this.getDropDiasDaSemana = function(callback) {
      callback(null, [
        { value: '*', name: 'Qualquer dia'},
        { value: '0', name: 'Domingo'},
        { value: '1', name: 'Segunda-feira'},
        { value: '2', name: 'Terça-feira'},
        { value: '3', name: 'Quarta-feira'},
        { value: '4', name: 'Quinta-feira'},
        { value: '5', name: 'Sexta-feira'},
        { value: '6', name: 'Sábado'},
      ]);
    };
  });
