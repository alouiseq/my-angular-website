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

        // Animate project section
        $scope.showInfo = function (index, showProj) {
            $scope.projects[index] = showProj;
        };

        var customPageHeaders = function () {
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

            // $('#navbar').addClass('navbar custom-navbar home-background');
        };

        var animateImage = function () {
            var canv = document.getElementById('canv');
            var ctx = canv.getContext('2d');
            var newImage = new Image();
            newImage.src = '/images/ironman-tech2.png';

            // process image on load
            newImage.onload = function () {
                canv.width = newImage.width;    // 1920 for mbp
                canv.height = '575';
                var width = canv.width;
                var height = canv.height;

                ctx.drawImage(newImage, 0, 0);

                var imageData = ctx.getImageData(0, 0, width, height);
                var pixelData = imageData.data;
                var totalPixels = height * width * 4;
                var startY = height / 2;
                var startX = width / 2;
                var startIndex = startY * width + startX * 4;
                var index = startIndex;
        
                for (var y=startY; y<height; y++) {      // rows
                    for (var x=startX; x<width; x++) {   // columns
                        // index = (y * canv.width + x) * 4;                          
                        pixelData[index++] = 183;
                        pixelData[index++] = 191;
                        pixelData[index++] = 203;
                        pixelData[index++] = 255;
                    }
                }
                // ctx.clearRect(0, 0, canv.width, canv.height);
                ctx.putImageData(imageData, 0, 0);
            };
        };


        /*** Initialize ***/

        // Add text and image to the top of the page
        customPageHeaders();

        // Animate header background with canvas
        animateImage();

    });
