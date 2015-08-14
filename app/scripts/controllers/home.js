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

        // Canvas items        
        var topBoxSeam = {
            startX: 1532,
            startY: 130,
            midX: 1570,
            midY: 152,
            curveX: 1581,
            curveY: 152,            
            cpx1: 1590,
            cpy1: 160,
            cpx2: 1592,
            cpy2: 159,
            endX: 1615,
            endY: 127, 
            rad: 30
        };  

        var bottomBoxSeam = {
            startX: 1532,
            startY: 160,
            midX: 1570,
            midY: 182,
            curveX: 1581,
            curveY: 182,            
            cpx1: 1590,
            cpy1: 160,
            cpx2: 1592,
            cpy2: 159,
            endX: 1615,
            endY: 157, 
            rad: 30
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

        // var manipulatePixels = function () {
        //     var canv = document.getElementById('canv');
        //     var ctx = canv.getContext('2d');
        //     var newImage = new Image();
        //     newImage.src = '/images/ironman-tech2.png';

        //     // process image on load
        //     newImage.onload = function () {
        //         canv.width = newImage.width;    // 1920 for mbp
        //         canv.height = '575';
        //         var width = canv.width;
        //         var height = canv.height;

        //         ctx.drawImage(newImage, 0, 0);

        //         var imageData = ctx.getImageData(0, 0, width, height);
        //         var pixelData = imageData.data;
        //         var totalPixels = height * width * 4;
        //         var r = 255;
        //         var g = 0;
        //         var b = 0;
        //         var a = 255;
        //         var count = 0;
        //         var index;
        //         var negIndex;
        //         var offset = 0;
        //         var count = 0;
        //         var thickX =10;
        //         var startY = Math.floor(131);
        //         var startX = Math.floor(1532);
        //         var currX = startX;
        //         var negX;
        //         var xLimit = 1615;
        //         var yLimit = 155;       

        //         var changePixels = function (index) {
        //             pixelData[index++] = r;
        //             pixelData[index++] = g;
        //             pixelData[index++] = b;
        //             pixelData[index++] = a;
        //         };
        
        //         for (var y=startY; y<yLimit; y++) {      // rows
        //             index = (y * width + currX + offset) * 4;

        //             for (var x=currX,z=xLimit; count<thickX; x++,z--) {   // columns                        
        //                 changePixels(index);
        //                 index = (y * width + x + offset) * 4;
        //                 count++;
        //                     negIndex = (y * width + z - offset) * 4;   
        //                     changePixels(negIndex);                        
        //             }                    
        //             offset++;
        //             currX++;
        //             count = 0;                    
        //         }
        //         offset = 0;
        //         ctx.putImageData(imageData, 0, 0);
        //     };
        // };

        var setup = function () { 
            $scope.canv = document.getElementById('canv');
            $scope.ctx = canv.getContext('2d');              
            $scope.newImage = new Image();
            $scope.newImage.src = '/images/ironman-tech2.png';

            // process image on load
            $scope.newImage.onload = function () {
                $scope.canv.width = $scope.newImage.width;
                $scope.canv.height = '575';
                $scope.ctx.drawImage($scope.newImage, 0, 0);

                // Animate box seams
                // window.setInterval(function () {
                    animateBoxSeam(topBoxSeam);                
                    // animateBoxSeam(bottomBoxSeam);  
                // }, 400);
                             
            };
        };

        var animateBoxSeam = function (item) { 
            var canv = $scope.canv;
            var ctx = $scope.ctx;
            var image = $scope.newImage;
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#c1d2f4';
            var currX = item.startX;
            var currY = item.startY;
            ctx.beginPath();
            ctx.moveTo(item.startX, item.startY);
            var animeId;
            var offsetX = 1.7;

            var animateLeftLine = function () {
                ctx.lineTo(currX, currY);
                ctx.stroke();
                currX += offsetX;
                currY++;
                animeId = window.setTimeout(animateLeftLine, 100);
                if (currX >= item.midX && currY >= item.midY) {
                    // currX += 12;
                    offsetX = 1;
                    window.clearTimeout(animeId);
                    // animateArcTo();
                    animateMidLine();
                }
            };

            var animateMidLine = function () {
                ctx.lineTo(currX, currY);
                ctx.stroke();
                currX += offsetX;
                animeId = window.setTimeout(animateMidLine, 100);
                if (currX >= item.curveX && currY >= item.curveY) {
                    offsetX = 1.4;
                    window.clearTimeout(animeId);
                    animateRightLine();
                }
            };

            var animateRightLine = function () {
                ctx.lineTo(currX, currY);
                ctx.stroke();
                currX += offsetX;
                currY--;
                animeId = window.setTimeout(animateRightLine, 100);
                if (currX >= item.endX && currY <= item.endY) {
                    window.clearTimeout(animeId);
                    ctx.clearRect(0, 0, canv.width, canv.height);
                    ctx.drawImage(image, 0, 0);
                    // animateBoxSeam(topBoxSeam);
                }
            };

            var animateArcTo = function () {
                ctx.arcTo(item.cpx1, item.cpy1, item.cpx2, item.cpy2, item.rad); 
                ctx.stroke();
                // animateRightLine();
                // ctx.lineTo(item.endX, item.endY);               
                // ctx.stroke();
            };

            window.setTimeout(animateLeftLine, 100);
         
        };


        /*** INITIALIZE ***/

        // Add text and image to the top of the page
        customPageHeaders();

        // Modify pixels for header background
        // manipulatePixels();         
        
        // Initial canvas setup
        setup();        

    });
