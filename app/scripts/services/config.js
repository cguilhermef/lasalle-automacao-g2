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
        return 'http://ubuntutres:3000/script';
      }
    };
  });
