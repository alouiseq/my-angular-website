'use strict';

/**
 * @ngdoc function
 * @name mywebsiteApp.controller:MainCtrl
 * @description
 * # HomeCtrl
 * Controller of the mywebsiteApp
 */
angular.module('mywebsiteApp')
    .controller('HomeCtrl', function ($scope) {
        $scope.title = 'Front-end Developer';
        $scope.info = '@ SHUTTERFLY';

        // Activate selected page header
        $('.nav').find('a').removeClass('active');
        $('.home').children('a').addClass('active');    
    });
