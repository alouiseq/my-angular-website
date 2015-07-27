'use strict';

/**
 * @ngdoc function
 * @name mywebsiteApp.controller:MainCtrl
 * @description
 * # HomeCtrl
 * Controller of the mywebsiteApp
 */
angular.module('mywebsiteApp')
    .controller('ContactCtrl', function ($scope, $timeout) {

		/*** Defaults ***/

        $scope.title = 'Let\'s Talk';
        $scope.info = 'How to reach me';


        /*** Initialize ***/

      	// Activate selected page header
        $('.nav').find('a').removeClass('active');
        $('.contact').children('a').addClass('active'); 

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
        $('#navbar').addClass('navbar custom-navbar contact-background');                 
    });
