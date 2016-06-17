'use strict';

/**
 * @ngdoc service
 * @name webappApp.moment
 * @description
 * # moment
 * Factory in the webappApp.
 */
angular.module('webappApp')
  .factory('moment', function ($window) {
    var moment = $window.moment;
    moment.locale('pt-BR');
    return moment;
  });
