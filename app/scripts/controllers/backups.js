'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:BackupsCtrl
 * @description
 * # BackupsCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('BackupsCtrl', function ($scope, Hosts, ngToast, Backups, _) {
    $scope.init = function() {
      if (!$scope.model) { $scope.model = {}; }

      $scope.model.hosts = Hosts.getHosts();

      $scope.model.ipOrigem = null;
      $scope.model.ipDestino = null;
      $scope.model.item = null;
      $scope.resetModelBackup();
      $scope.resetModelAgendar();
      $scope.model.backups = [];
      $scope.model.agendamentos = [];
      $scope.running = false;
      $scope.agendando = false;
      Backups.getListaBackups(function(error, data) {
        if (!error) {
          $scope.model.backups = data;
        }
      });

      Backups.getListaAgendamentos(function(error, data) {
        if (!error) {
          $scope.model.agendamentos = _.cloneDeep(data.content.agendamentos);
          _.each($scope.model.agendamentos, function(a) {
            a.humanize = {
              diaDaSemana: Backups.humanizeDiaSemana(a.diaDaSemana),
              mes: Backups.humanizeMes(a.mes),
              dia: Backups.humanizeDia(a.dia)
            };
          });
        }
      });

      Backups.getDropHoras(function(error, data) {
        if (!error) {
          $scope.model.horas = data;
        }
      });
      Backups.getDropMinutos(function(error, data) {
        if (!error) {
          $scope.model.minutos = data;
        }
      });
      Backups.getDropDias(function(error, data) {
        if (!error) {
          $scope.model.dias = data;
        }
      });
      Backups.getDropDiasDaSemana(function(error, data) {
        if (!error) {
          $scope.model.diasDaSemana = data;
        }
      });
      Backups.getDropMeses(function(error, data) {
        if (!error) {
          $scope.model.meses = data;
        }
      });
    };
    $scope.resetModelBackup = function() {
      if (!$scope.model) { $scope.model = {}; }
      $scope.model.backup = {
        hostOrigem: '',
        hostDestino: '',
        itens: []
      };
    };
    $scope.resetModelAgendar = function() {
      if (!$scope.model) { $scope.model = {}; }
      $scope.model.agendamento = {
        diaDaSemana: '',
        mes: '',
        hora: '',
        minuto: '',
        identificacao: ''
      };
    };
    $scope.confirmarOrigemDestino = function($event) {
      $event.delegateTarget.toggleLoading();
      $scope.running = true;
      var backup = $scope.model.backup;
      ngToast.dismiss();
      ngToast.create({
        className: 'warning',
        content: '<span class="fa fa-clock-o fa-2x v-align-m pulsing"></span> Verificando disponibilidade dos hosts...',
        dismissOnTimeout: false,
        dismissOnClick: false
      });
      Backups.verificarOrigemDestino($scope.model.ipOrigem, $scope.model.ipDestino, function(error, data) {
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
        if (!data.content.origem) {
          ngToast.create({
            className: 'danger',
            content:'<span class="fa fa-ban fa-2x v-align-m"></span> O host de origem está inacessível no momento!',
            timeout: 4000
          });
        }
        if (!data.content.destino) {
          ngToast.create({
            className: 'danger',
            content:'<span class="fa fa-ban fa-2x v-align-m"></span> O host de destino está inacessível no momento!',
            timeout: 4000
          });
        }
        if (data.content.origem && data.content.destino) {
          backup.hostOrigem = _.clone($scope.model.ipOrigem);
          backup.hostDestino = _.clone($scope.model.ipDestino);
          ngToast.create({
            className: 'success',
            content:'<span class="fa fa-check fa-2x v-align-m"></span> Hosts ativos e disponíveis para backup!',
            timeout: 4000
          });
        }
      });
    };

    $scope.executarBackup = function($event) {
      $scope.running = true;
      $event.delegateTarget.toggleLoading();
      Backups.executarBackup(
        $scope.model.backup.hostOrigem,
        $scope.model.backup.hostDestino,
        _.without($scope.model.backup.itens, ''), function(error, data) {
          $event.delegateTarget.toggleLoading();
          $scope.running = false;
        if (data.exitCode !== 0 ) {
          ngToast.dismiss();
          ngToast.danger(data.content.message);
          return;
        }
        ngToast.dismiss();
        ngToast.success(data.content.message);
        $scope.resetModelBackup();
        $scope.model.backups.push({
          ipOrigem: data.content.ipOrigem,
          ipDestino: data.content.ipDestino,
          dataExecucao: data.content.dataExecucao,
          arquivoGerado: data.content.arquivoGerado
        });
      });
    };

    $scope.addItem = function() {
      if (!$scope.model.item) {
        return;
      }
      $scope.model.backup.itens.push(_.clone($scope.model.item));
      $scope.model.item = null;
    };
    $scope.removeItem = function(item) {
      $scope.model.backup.itens = _.without($scope.model.backup.itens, item);
    };
    $scope.cancelarBackup = function() {
      $scope.resetModelBackup();
    };

    $scope.iniciarAgendamento = function() {
      $scope.agendando = true;
      $scope.resetModelAgendar();
    };
    $scope.agendarBackup = function() {
      if ($scope.novoBackup.$invalid) {
        return;
      }
      ngToast.dismiss();
      ngToast.create({
        className: 'warning',
        content: '<span class="fa fa-clock-o fa-2x v-align-m pulsing"></span> Registrando agendamento...',
        dismissOnTimeout: false,
        dismissOnClick: false
      });
      var agendamento = _.cloneDeep($scope.model.agendamento);
      var backup = _.cloneDeep($scope.model.backup);
      var cronConfig = ''+
        agendamento.minuto.toString() + ' ' +
        agendamento.hora.toString() + ' ' +
        agendamento.dia.toString() + ' ' +
        agendamento.mes.toString() + ' ' +
        agendamento.diaDaSemana.toString();
      Backups.agendarBackup(cronConfig, backup, agendamento.identificacao, function(error) {
        if (!error) {
          ngToast.dismiss();
          ngToast.create({
            className: 'success',
            content: '<span class="fa fa-check fa-2x v-align-m"></span> Agendamento registrado com sucesso!',
          });
          $scope.model.agendamentos.push({
            backup: backup,
            agendamento: cronConfig
          });
          $scope.resetModelAgendar();
          $scope.resetModelBackup();
        }
      });
    };
    $scope.cancelarAgendamento = function() {
      $scope.agendando = false;
      $scope.resetModelAgendar();
    };
    $scope.removerAgendamento = function($event, agendamento) {
      $event.delegateTarget.toggleLoading();
      var ok = window.confirm('Deseja realmente cancelar este agendamento?');
      $scope.model.agendamentos = _.omit($scope.model.agendamentos, {identificacao: agendamento.identificacao});
      if (ok) {
        ngToast.dismiss();
        ngToast.create({
          className: 'warning',
          content: '<span class="fa fa-clock-o fa-2x v-align-m pulsing"></span> Removendo o agendamento...',
          dismissOnTimeout: false,
          dismissOnClick: false
        });
        Backups.removerAgendamento(agendamento, function(error, data) {
          console.log(error, data);
          ngToast.dismiss();
          $event.delegateTarget.toggleLoading();
        });
      }
    };
    $scope.init();
  });
