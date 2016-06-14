'use strict';

/**
 * @ngdoc service
 * @name webappApp.usuario
 * @description
 * # usuario
 * Service in the webappApp.
 */
angular.module('webappApp')
  .service('Usuarios', function (moment) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    console.log(moment([2010, 1, 14, 15, 25, 39]));
    this.getUsuario = function(ip, user) {
      console.log(ip, user);
      // $http.get('http://ubututres:3000/command=getUsuario&ip='+ip+'&user='+user, function(error, data){
      //   if(!error) {
      //     callback(null, data);
      //   }
      // })
    };
  });
