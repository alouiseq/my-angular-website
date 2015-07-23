'use strict';

/**
 * @ngdoc function
 * @name mywebsiteApp.controller:MainCtrl
 * @description
 * # HomeCtrl
 * Controller of the mywebsiteApp
 */
angular.module('mywebsiteApp')
    .controller('ProjectsCtrl', function ($scope) {

        /*** Defaults ***/

        // Activate selected page header 
        $('.nav').find('a').removeClass('active');
        $('.projects').children('a').addClass('active');                         
    });
