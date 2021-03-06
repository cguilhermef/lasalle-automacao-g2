'use strict';

/**
 * @ngdoc overview
 * @name webappApp
 * @description
 * # webappApp
 *
 * Main module of the application.
 */
angular
  .module('webappApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngToast',
    'ngStorage'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'ctrl'
      })
      .when('/usuario', {
        templateUrl: 'views/usuarios.html',
        controller: 'UsuariosCtrl',
        controllerAs: 'ctrl'
      })
      .when('/backups', {
        templateUrl: 'views/backups.html',
        controller: 'BackupsCtrl',
        controllerAs: 'ctrl'
      })
      .when('/monitoramento', {
        templateUrl: 'views/monitoramento.html',
        controller: 'MonitoramentoCtrl',
        controllerAs: 'monitoramento'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['ngToastProvider', function(ngToast) {
    ngToast.configure({
      verticalPosition: 'top',
      horizontalPosition: 'center',
      maxNumber: 3
    });
  }]).run(function($rootScope, $locale, Config) {
    $locale.NUMBER_FORMATS.CURRENCY_SYM = 'R$ ';
    $locale.DATETIME_FORMATS.shortDate = 'dd/MM/yyyy';
    Config.getScriptURL(function(error, data) {      
      if (!error) {
        $rootScope.config = {
          URL_SCRIPTS: data
        };
      }
    });
  });
