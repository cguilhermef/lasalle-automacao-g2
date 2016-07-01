'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MonitoramentoCtrl
 * @description
 * # MonitoramentoCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('MonitoramentoCtrl', function ($scope, _, Monitoramento, Hosts, ngToast) {

    $scope.init = function() {
      if (!$scope.model) { $scope.model = {}; }

      $scope.model.hostsDisponiveis = Hosts.getHosts();
      Monitoramento.getHostsMonitorados(function(error, data) {
        if (!error) {
          $scope.model.hostsMonitorados = data.content.hosts;
        }
      });
      Monitoramento.getPortasMonitoradas(function(error, data) {
        if (!error) {
          $scope.model.portasMonitoradas = data.content.portas;
        }
      });
      $scope.model.monitoramentoIPs = [];
      $scope.model.monitoramentoPortas = [];

    };

    $scope.addHost = function($event) {

      $event.delegateTarget.toggleLoading();
      $scope.running = true;
      ngToast.dismiss();
      ngToast.create({
        className: 'warning',
        content: '<span class="fa fa-clock-o fa-2x v-align-m pulsing"></span> Adicionado host...',
        dismissOnTimeout: false,
        dismissOnClick: false
      });

      Monitoramento.addHost($scope.model.host, function(error, data) {
        $event.delegateTarget.toggleLoading();
        $scope.running = false;
        ngToast.dismiss();
        if (error || data.content.exitCode === 500 ) {
          ngToast.create({
            className: 'danger',
            content:'<span class="fa fa-ban fa-2x v-align-m"></span>' + data.content.message,
            timeout: 4000
          });
          return;
        }

        $scope.model.hostsMonitorados.push($scope.model.host);
        $scope.model.host = '';
        ngToast.create({
          className: 'success',
          content:'<span class="fa fa-check fa-2x v-align-m"></span>' + data.content.message,
          timeout: 4000
        });
      });
    };
    $scope.addPorta = function($event) {

      $event.delegateTarget.toggleLoading();
      $scope.running = true;
      ngToast.dismiss();
      ngToast.create({
        className: 'warning',
        content: '<span class="fa fa-clock-o fa-2x v-align-m pulsing"></span> Adicionado porta...',
        dismissOnTimeout: false,
        dismissOnClick: false
      });

      Monitoramento.addPorta($scope.model.porta, function(error, data) {
        $event.delegateTarget.toggleLoading();
        $scope.running = false;
        ngToast.dismiss();
        if (error || data.content.exitCode === 500 ) {
          ngToast.create({
            className: 'danger',
            content:'<span class="fa fa-ban fa-2x v-align-m"></span>' + data.content.message,
            timeout: 4000
          });
          return;
        }

        $scope.model.portasMonitoradas.push($scope.model.porta);
        $scope.model.pora = '';
        ngToast.create({
          className: 'success',
          content:'<span class="fa fa-check fa-2x v-align-m"></span>' + data.content.message,
          timeout: 4000
        });
      });
    };

    $scope.delHost = function($event, ip) {

      $event.delegateTarget.toggleLoading();
      $scope.running = true;
      ngToast.dismiss();
      ngToast.create({
        className: 'warning',
        content: '<span class="fa fa-clock-o fa-2x v-align-m pulsing"></span> Removendo o host...',
        dismissOnTimeout: false,
        dismissOnClick: false
      });

      Monitoramento.delHost(ip, function(error, data) {
        $event.delegateTarget.toggleLoading();
        $scope.running = false;
        ngToast.dismiss();
        if (error || data.content.exitCode === 500 ) {
          ngToast.create({
            className: 'danger',
            content:'<span class="fa fa-ban fa-2x v-align-m"></span>' + data.content.message,
            timeout: 4000
          });
          return;
        }
        $scope.model.hostsMonitorados = _.without($scope.model.hostsMonitorados, ip);
        ngToast.create({
          className: 'success',
          content:'<span class="fa fa-check fa-2x v-align-m"></span>' + data.content.message,
          timeout: 4000
        });
      });
    };
    $scope.delPorta = function($event, porta) {

      $event.delegateTarget.toggleLoading();
      $scope.running = true;
      ngToast.dismiss();
      ngToast.create({
        className: 'warning',
        content: '<span class="fa fa-clock-o fa-2x v-align-m pulsing"></span> Removendo a porta...',
        dismissOnTimeout: false,
        dismissOnClick: false
      });

      Monitoramento.delPorta(porta, function(error, data) {
        $event.delegateTarget.toggleLoading();
        $scope.running = false;
        ngToast.dismiss();
        if (error || data.content.exitCode === 500 ) {
          ngToast.create({
            className: 'danger',
            content:'<span class="fa fa-ban fa-2x v-align-m"></span>' + data.content.message,
            timeout: 4000
          });
          return;
        }
        $scope.model.portasMonitoradas = _.without($scope.model.portasMonitoradas, porta);
        ngToast.create({
          className: 'success',
          content:'<span class="fa fa-check fa-2x v-align-m"></span>' + data.content.message,
          timeout: 4000
        });
      });
    };
    $scope.added = function(host) {
      return _.includes($scope.model.hostsMonitorados, host);
    };
    $scope.monitorarIPs = function($event) {
      $scope.running = true;
      $event.delegateTarget.toggleLoading();
      ngToast.dismiss();
      ngToast.create({
        className: 'warning',
        content: '<span class="fa fa-clock-o fa-2x v-align-m pulsing"></span> Executando rotina...',
        dismissOnTimeout: false,
        dismissOnClick: false
      });
      Monitoramento.monitorarIPs(function(error, data) {
        $scope.running = false;
        $event.delegateTarget.toggleLoading();
        ngToast.dismiss();
        if (!error && data.exitCode === 0) {
          $scope.model.monitoramentoIPs = _.map(data.content.log, function(v){
            return {
              result: v,
              status: v.search(/Sucesso/) > -1
            };
          });

          ngToast.create({
            className: 'success',
            content:'<span class="fa fa-check fa-2x v-align-m"></span> Rotina finalizada com sucesso!',
            timeout: 4000
          });
          return;
        }
        ngToast.create({
          className: 'danger',
          content:'<span class="fa fa-ban fa-2x v-align-m"></span> Ocorreu um erro',
          timeout: 4000
        });
      });
    };
    $scope.monitorarPortas = function($event) {
      $scope.running = false;
      $event.delegateTarget.toggleLoading();
      ngToast.dismiss();
      ngToast.create({
        className: 'warning',
        content: '<span class="fa fa-clock-o fa-2x v-align-m pulsing"></span> Executando rotina...',
        dismissOnTimeout: false,
        dismissOnClick: false
      });
      Monitoramento.monitorarPortas(function(error, data) {
        $scope.running = true;
        $event.delegateTarget.toggleLoading();
        ngToast.dismiss();
        if (!error && data.exitCode === 0) {
          $scope.model.monitoramentoPortas = data.content.log;

          ngToast.create({
            className: 'success',
            content:'<span class="fa fa-check fa-2x v-align-m"></span> Rotina finalizada com sucesso!',
            timeout: 4000
          });
          return;
        }
        ngToast.create({
          className: 'danger',
          content:'<span class="fa fa-ban fa-2x v-align-m"></span> Ocorreu um erro',
          timeout: 4000
        });
      });
    };
    $scope.init();
  });
