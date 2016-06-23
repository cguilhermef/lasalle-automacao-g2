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
        return 'http://192.168.43.214:3000/script';
      }
    };
  });
