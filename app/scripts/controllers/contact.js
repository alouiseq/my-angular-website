'use strict';

/**
 * @ngdoc function
 * @name mywebsiteApp.controller:MainCtrl
 * @description
 * # HomeCtrl
 * Controller of the mywebsiteApp
 */
angular.module('mywebsiteApp')
    .controller('ContactCtrl', function ($scope) {

      // Activate selected page header
        $('.nav').find('a').removeClass('active');
        $('.contact').children('a').addClass('active');                   
    });
