define(['angular'], function (angular) {

    'use strict';

    /**
     * @ngdoc function
     * @name mywebsiteApp.controller:MainCtrl
     * @description
     * # HomeCtrl
     * Controller of the mywebsiteApp
     */
     
    angular.module('mywebsiteApp.controllers.ContactCtrl', [])
        .controller('ContactCtrl', function ($scope, $timeout, Settings) {

            /*** DEFAULTS ***/

            $scope.title = 'Let\'s Talk';
            $scope.info = 'How to reach me';
            var pageName = 'contact';
            var pageClass = 'contact-background';


            /*** INITIALIZE ***/

            // update based on current page
            Settings.customizeHeader($scope.title, $scope.info, pageName, pageClass);

        });
});