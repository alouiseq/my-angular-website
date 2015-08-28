define(['angular', 'controllers/main', 'directives/main', 'services/main'], function (angular) {

    'use strict';

    /**
     * @ngdoc overview
     * @name mywebsiteApp
     * @description
     * # mywebsiteApp
     *
     * Main module of the application.
     */
    return angular.module('mywebsiteApp', [
            'mywebsiteApp.controllers',
            'mywebsiteApp.directives',
            'mywebsiteApp.services',
            'ngAnimate',
            'ngAria',
            'ngCookies',
            'ngMessages',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'ui.router',
            'ngHighcharts'
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
        })
        .run(function () {

            // Stickify and animate nav headers
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > 155) {
                    $('#nav-title1').addClass('sticky-title1');
                    $('#nav-title2').addClass('sticky-title2');
                } else {
                    $('#nav-title1').removeClass('sticky-title1');
                    $('#nav-title2').removeClass('sticky-title2');
                }
                if ($(this).scrollTop() > 366) {
                    $('.header-wrapper').addClass('sticky-navbar');
                    $('#nav-title2').removeClass('sticky-title2');
                } else {
                    $('.header-wrapper').removeClass('sticky-navbar');

                }
            });
        });
});