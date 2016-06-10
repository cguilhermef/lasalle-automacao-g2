'use strict';

/**
 * @ngdoc service
 * @name webappApp.lodash
 * @description
 * # lodash
 * Factory in the webappApp.
 */
angular.module('webappApp')
  .factory('_', function ($window) {
    var _ = $window._;
    return _;
  });
