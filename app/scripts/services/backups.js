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
      var tmp = _.range(2,24);
      var head = [
        { value: 'A', name: 'à cada uma hora' },
        { value: 0, name: 'à meia noite' },
        { value: 1, name: 'à 1 hora' }
      ];
      var tail = _.map(tmp, function(n) {
        return { value: n, name: 'às ' + n + ' horas' };
      });
      callback(null, head.concat(tail));
    };
    this.getDropMinutos = function(callback) {
      var tmp = _.range(2,60);
      var head = [
        { value: 'A', name: 'à cada minuto' },
        { value: 0, name: '0 minutos' },
        { value: 1, name: '1 minuto' }
      ];
      var tail = _.map(tmp, function(n) {
        return { value: n, name: n + ' minutos' };
      });
      callback(null, head.concat(tail));
    };
    this.getDropDias = function(callback) {
      var tmp = _.range(2,32);
      var head = [
        { value: 'A', name: 'todos os dias' },
        { value: 1, name: 'todo dia 1º' }
      ];
      var tail = _.map(tmp, function(n) {
        return { value: n, name: 'todo dia ' + n };
      });
      callback(null, head.concat(tail));
    };
    this.getDropMeses = function(callback) {
      callback(null, [
        { value: 'A', name: 'Todos os meses'},
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
        { value: 'A', name: 'Qualquer dia'},
        { value: '0', name: 'Domingos'},
        { value: '1', name: 'Segundas-feira'},
        { value: '2', name: 'Terças-feira'},
        { value: '3', name: 'Quartas-feira'},
        { value: '4', name: 'Quintas-feira'},
        { value: '5', name: 'Sextas-feira'},
        { value: '6', name: 'Sábados'},
      ]);
    };

    this.agendarBackup = function(identificacao, agendamento, backup, callback) {
      $http.post(Config.getScriptURL(), {
        command: 'backup/agendarBackup',
        params: [identificacao, agendamento, backup.hostOrigem, backup.hostDestino, backup.itens]
      }).then(function(response) {
        callback(null, response.data);
      }, function(error){
        callback(error);
      });
    };
  });
