'use strict';

/**
 * @ngdoc overview
 * @name mywebsiteApp
 * @description
 * # mywebsiteApp
 *
 * Main module of the application.
 */
angular
    .module('mywebsiteApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'partials/home.html',
                controller: 'HomeCtrl'
            })
            .state('projects', {
                url: '/projects',
                templateUrl: 'partials/projects.html',
                controller: 'ProjectsCtrl'
            })
            .state('resume', {
                url: '/resume',
                templateUrl: 'partials/resume.html',
                controller: 'ResumeCtrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'partials/about.html',
                controller: 'AboutCtrl'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'partials/contact.html',
                controller: 'ContactCtrl'
            });
    });
