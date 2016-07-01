'use strict';

/**
 * @ngdoc service
 * @name webappApp.backups
 * @description
 * # backups
 * Service in the webappApp.
 */
angular.module('webappApp')
  .service('Backups', function ($http, _, $rootScope) {
    var service = this;
    var URL_SCRIPTS = $rootScope.config.URL_SCRIPTS;

    this.verificarOrigemDestino = function(ipOrigem, ipDestino, callback) {
      $http.post(URL_SCRIPTS, {
        command: 'backup/verificarOrigemDestino',
        params: [ipOrigem, ipDestino]
      }).then(function(response){
          callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };
    this.executarBackup = function(ipOrigem, ipDestino, itens, callback) {
      var params = [ipOrigem, ipDestino].concat(itens);

      $http.post(URL_SCRIPTS, {
        command: 'backup/executarBackup',
        params: params
      }).then(function(response) {
        callback(null, response.data);
      }, function(error){
        callback(error);
      });
    };

    this.getListaBackups = function(callback) {
      $http.post(URL_SCRIPTS, {
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
      var response = head.concat(tail);
      if (callback) {
        callback(null, response );
        return;
      }
      return response;
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
      var response = head.concat(tail);
      if (callback) {
        callback(null, response);
        return;
      }
      return response;
    };
    this.getDropDias = function(callback) {
      var tmp = _.range(2,32);
      var head = [
        { value: 'A', name: 'Todos os dias' },
        { value: '1', name: 'todo dia 1º' }
      ];
      var tail = _.map(tmp, function(n) {
        return { value: n.toString(), name: 'todo dia ' + n };
      });
      var response = head.concat(tail);
      if (callback) {
        callback(null, response);
        return;
      }
      return response;
    };
    this.getDropMeses = function(callback) {
      var response = [
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
      ];
      if (callback) {
        callback(null, response);
        return;
      }
      return response;
    };
    this.getDropDiasDaSemana = function(callback) {
      var response = [
        { value: 'A', name: 'Toda a semana'},
        { value: '0', name: 'Domingos'},
        { value: '1', name: 'Segundas-feira'},
        { value: '2', name: 'Terças-feira'},
        { value: '3', name: 'Quartas-feira'},
        { value: '4', name: 'Quintas-feira'},
        { value: '5', name: 'Sextas-feira'},
        { value: '6', name: 'Sábados'},
      ];
      if (callback) {
        callback(null, response);
        return;
      }
      return response;
    };

    this.agendarBackup = function(agendamento, backup, identificacao, callback) {
      $http.post(URL_SCRIPTS, {
        command: 'backup/agendarBackup',
        params: [identificacao, agendamento, backup.hostOrigem, backup.hostDestino, backup.itens]
      }).then(function(response) {
        callback(null, response.data);
      }, function(error){
        callback(error);
      });
    };
    this.getListaAgendamentos = function(callback) {
      $http.post(URL_SCRIPTS, {
        command: 'backup/listarAgendamentos',
        params: []
      }).then(function(response) {
        callback(null, response.data);
      }, function(error) {
        console.log('Error');
        callback(error);
      });
    };
    this.humanizeDiaSemana = function(num) {
      var diasDaSemana = service.getDropDiasDaSemana();
      return _.chain(diasDaSemana)
        .filter({value:num})
        .head()
        .value().name;
    };
    this.humanizeMes = function(num) {
      var mes = service.getDropMeses();
      return _.chain(mes)
        .filter({value:num})
        .head()
        .value().name;
    };
    this.humanizeDia = function(num) {
      var dia = service.getDropDias();
      return _.chain(dia)
        .filter({value:num})
        .head()
        .value().name;
    };
    this.removerAgendamento = function(agendamento, callback) {
      $http.post(URL_SCRIPTS, {
        command: 'backup/removerAgendamento',
        params: [agendamento]
      }).then(function(response) {
        callback(null, response.data);
      }, function(error){
        callback(error);
      });
    };
  });
