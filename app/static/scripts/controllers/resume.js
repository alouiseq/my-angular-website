define(['angular'], function (angular) {

    'use strict';

    /**
     * @ngdoc function
     * @name mywebsiteApp.controller:MainCtrl
     * @description
     * # HomeCtrl
     * Controller of the mywebsiteApp
     */
    angular.module('mywebsiteApp.controllers.ResumeCtrl', [])
        .controller('ResumeCtrl', function ($scope, $timeout, Settings) {
            
            /*** DEFAULTS ***/

            $scope.title = 'Skills';
            $scope.info = 'Qualifications and Experiences';
            var pageName = 'resume';
            var pageClass = 'resume-background';


            /*** INITIALIZE ***/

            // update based on current page
            Settings.customizeHeader($scope.title, $scope.info, pageName, pageClass);
   
        });
});