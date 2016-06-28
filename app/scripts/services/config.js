'use strict';

/**
 * @ngdoc service
 * @name webappApp.config
 * @description
 * # config
 * Factory in the webappApp.
 */
angular.module('webappApp')
  .factory('Config', function () {
    return {
      getScriptURL: function() {
        return 'http://10.0.0.107:3001/script';
      }
    };
  });
