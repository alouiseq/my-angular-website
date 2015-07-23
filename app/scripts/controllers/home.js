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

        /*** Defaults ***/

        $scope.title = 'Front-end Developer';
        $scope.info = '@ SHUTTERFLY';
        $scope.projects = {
            one = false;
            two = false;
            three = false;
        }

        /*** Initialize ***/

        // Activate selected page header
        $('.nav').find('a').removeClass('active');
        $('.home').children('a').addClass('active');    
    });
