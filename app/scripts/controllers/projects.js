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

        $scope.title = 'Projects';
        $scope.info = 'Work and Personal Stuff I\'ve worked on';

        /*** Initialize ***/

        // Activate selected page header 
        $('.nav').find('a').removeClass('active');
        $('.projects').children('a').addClass('active');     

        // Add specific data to nav area
        $('#nav-title1').find('em').text($scope.title);
        $('#nav-title2').find('h2').text($scope.info);
        $('.navbar').removeClass(function () {
            return $(this).attr('class');
        });
        $('#navbar').addClass('navbar custom-navbar projects-background');
    });
