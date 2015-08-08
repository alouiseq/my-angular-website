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
                var r = 255;
                var g = 0;
                var b = 0;
                var a = 255;
                var count = 0;
                var index;
                var negIndex;
                var offset = 0;
                var count = 0;
                var thickX =10;
                var startY = Math.floor(131);
                var startX = Math.floor(1532);
                var currX = startX;
                var negX;
                var xLimit = 1615;
                // var endX = xLimit;
                var yLimit = 155;       

                var changePixels = function (index) {
                    pixelData[index++] = r;
                    pixelData[index++] = g;
                    pixelData[index++] = b;
                    pixelData[index++] = a;
                };
        
                for (var y=startY; y<yLimit; y++) {      // rows
                    index = (y * width + currX + offset) * 4;

                    // for (var x=currX;;) {   // columns                        
                    for (var x=currX,z=xLimit; count<thickX; x++,z--) {   // columns                        
                        changePixels(index);
                        index = (y * width + x + offset) * 4;
                        count++;
                        // if (x === currX) {
                            // x = --xLimit;
                            negIndex = (y * width + z - offset) * 4;   
                            changePixels(negIndex);    
                        // } else {
                            // break;
                        // }                        
                    }                    
                    // offset <= 12 ? offset++ : offset;
                    offset++;
                    currX++;
                    count = 0;                    
                }
                offset = 0;
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
