'use strict';

/**
 * @ngdoc function
 * @name mywebsiteApp.controller:MainCtrl
 * @description
 * # HomeCtrl
 * Controller of the mywebsiteApp
 */
angular.module('mywebsiteApp')
    .controller('ResumeCtrl', function ($scope) {
        
        // Activate selected page header
        $('.nav').find('a').removeClass('active');
        $('.resume').children('a').addClass('active');                           
    });
