'use strict';

/**
 * @ngdoc directive
 * @name webappApp.directive:loader
 * @description
 * # loader
 */
angular.module('webappApp')
  .directive('loader', function () {
    return {
      scope: {
        loaderIcon: '@'
      },
    	priority: 1,
    	restrict: 'A',
    	link: function postLink(scope, element) {
    		element.context.toggleLoading = function() {
          element.prop('disabled', !element.prop('disabled'));
    			element.find('.fa').each(function(){
            // O each é usado porque alguns botões possuem dois .fa - 1 para
            // mobile e outro para desktops
            $(this).toggleClass((scope.loaderIcon || '') + ' fa-spin');
          });
    		};
    	}
    };
  });
