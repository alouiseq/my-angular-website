define(['angular', 'connectFour'], function (angular) {

    'use strict';

    /**
     * @ngdoc function
     * @name mywebsiteApp.controller:MainCtrl
     * @description
     * # HomeCtrl
     * Controller of the mywebsiteApp
     */
    angular.module('mywebsiteApp.controllers.ProjectsCtrl', [
            'connectFourApp.directives.connectFour'
        ])
        .controller('ProjectsCtrl', function ($scope, $timeout, Settings) {

            /*** DEFAULTS ***/

            $scope.title = 'Projects';
            $scope.info = 'Personal / Home Efforts';
            var pageName = 'projects';
            var pageClass = 'projects-background';           


            /*** INITIALIZE ***/

            // update based on current page
            Settings.customizeHeader($scope.title, $scope.info, pageName, pageClass);

            // retrieve project links
            $scope.projects = Settings.getProjectLinks();
        });
});