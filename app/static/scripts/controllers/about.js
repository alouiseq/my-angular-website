define(['angular'], function (angular) {

    'use strict';

    /**
     * @ngdoc function
     * @name mywebsiteApp.controller:AboutCtrl
     * @description
     * # AboutCtrl
     * Controller of the mywebsiteApp
     */
     
    angular.module('mywebsiteApp.controllers.AboutCtrl', [])
        .controller('AboutCtrl', function ($scope, $timeout, Settings) {
            
            /*** DEFAULTS ***/

            $scope.title = 'Who am I?';
            $scope.info = 'Get to know me';
            var pageName = 'about';
            var pageClass = 'about-background';


            /*** INITIALIZE ***/
            
            // update based on current page
            Settings.customizeHeader($scope.title, $scope.info, pageName, pageClass);

        });
});