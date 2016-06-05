'use strict';

/**
 * @ngdoc directive
 * @name webappApp.directive:feedback
 * @description
 * # feedback
 */
angular.module('webappApp')
  .directive('feedback', function () {
    return {
      scope: {
        message: '=message',
        icon: '=icon'
      },
      templateUrl: 'templates/feedback.html',
      restrict: 'E'
    };
  });
