'use strict';

/**
 * @ngdoc function
 * @name mywebsiteApp.controller:MainCtrl
 * @description
 * # HomeCtrl
 * Controller of the mywebsiteApp
 */
angular.module('mywebsiteApp')
    .controller('HomeCtrl', function ($scope, $timeout) {

        /*** Defaults ***/

        $scope.title = 'Front-end Developer';
        $scope.info = '@ Shutterfly';
        $scope.projects = {
            one: false,
            two: false,
            three: false
        };


        /*** Methods ***/
        $scope.showInfo = function (index, showProj) {
            $scope.projects[index] = showProj;
        };


        /*** Initialize ***/

        // Activate selected page header
        $('.nav').find('a').removeClass('active');
        $('.home').children('a').addClass('active');    

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
        $('#navbar').addClass('navbar custom-navbar home-background');

        // Animate header background with canvas
        var canv = document.getElementById('canv');
        var ctx = canv.getContext('2d');
        var imgData = ctx.createImageData(10, 10);
        var pixelData = imgData.data;
        for (var i=0; i<pixelData.length; i+=4) {
            pixelData[i] = 255;
            pixelData[i+1] = 0;
            pixelData[i+2] = 0;
            pixelData[i+3] = 255;
        }
        ctx.putImageData(imgData, 100, 40);

    });
