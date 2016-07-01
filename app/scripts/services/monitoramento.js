'use strict';

/**
 * @ngdoc service
 * @name webappApp.monitoramento
 * @description
 * # monitoramento
 * Service in the webappApp.
 */
angular.module('webappApp')
  .service('Monitoramento', function ($rootScope, $http) {

    var service = this;
    var URL_SCRIPTS = $rootScope.config.URL_SCRIPTS;

    service.getHostsMonitorados = function(callback) {
      $http.post(URL_SCRIPTS, {
        command: 'monitor/listarIps'
      }).then(function(response) {
        callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };
    service.getPortasMonitoradas = function(callback) {
      $http.post(URL_SCRIPTS, {
        command: 'monitor/listarPortas'
      }).then(function(response) {
        callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };
    service.addHost = function(ip, callback) {
      $http.post(URL_SCRIPTS, {
        command: 'monitor/adicionarIp',
        params: [ip]
      }).then(function(response) {
        callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };
    service.addPorta = function(porta, callback) {
      $http.post(URL_SCRIPTS, {
        command: 'monitor/adicionarPorta',
        params: [porta]
      }).then(function(response) {
        callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };
    service.delHost = function(ip, callback) {
      $http.post(URL_SCRIPTS, {
        command: 'monitor/removerIp',
        params: [ip]
      }).then(function(response) {
        callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };
    service.delPorta = function(porta, callback) {
      $http.post(URL_SCRIPTS, {
        command: 'monitor/removerPorta',
        params: [porta]
      }).then(function(response) {
        callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };
    service.monitorarIPs = function(callback) {
      $http.post(URL_SCRIPTS, {
        command: 'monitor/monitorarIPs'
      }).then(function(response) {
        callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };
    service.monitorarPortas = function(callback) {
      $http.post(URL_SCRIPTS, {
        command: 'monitor/monitorarPortas'
      }).then(function(response) {
        callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };
    service.getLogs = function(callback) {
      $http.post(URL_SCRIPTS, {
        command: 'monitor/logCompleto'
      }).then(function(response) {
        callback(null, response.data);
      }, function(error) {
        callback(error);
      });
    };

  });
