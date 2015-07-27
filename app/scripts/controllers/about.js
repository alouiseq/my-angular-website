'use strict';

/**
 * @ngdoc function
 * @name mywebsiteApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mywebsiteApp
 */
angular.module('mywebsiteApp')
  .controller('AboutCtrl', function ($scope, $timeout) {
    
        /*** Defaults ***/

        $scope.title = 'Who am I?';
        $scope.info = 'Get to know me';


        /*** Initialize ***/

        // Activate selected page header 
        $('.nav').find('a').removeClass('active');
        $('.about').children('a').addClass('active');   

        // Add specific data to nav area
        $('#nav-title1').find('em').text($scope.title);
        $('#nav-title2').find('h2').text($scope.info);
        $('#titles').removeClass('titles-animate');
        $timeout(function () {
            $('#titles').addClass('titles-animate');
        });

        // Custom nav header background
        $('.navbar').removeClass(function () {
            return $(this).attr('class');
        });
        $('#navbar').addClass('navbar custom-navbar about-background');              
  });
