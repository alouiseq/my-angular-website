'use strict';

/**
 * @ngdoc function
 * @name mywebsiteApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mywebsiteApp
 */
angular.module('mywebsiteApp')
  .controller('AboutCtrl', function ($scope) {
    
        /*** Defaults ***/

        // Activate selected page header 
        $('.nav').find('a').removeClass('active');
        $('.about').children('a').addClass('active');     
  });
