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
            midX: 1569,
            midY: 152,            
            cpx1: 1577,
            cpy1: 157,
            cpx2: 1585,
            cpy2: 152,
            endX: 1613,
            endY: 129, 
            rad: 20
        };  

        var bottomBoxSeam = {
            startX: 1532,
            startY: 154,
            midX: 1569,
            midY: 182,            
            cpx1: 1577,
            cpy1: 187,
            cpx2: 1585,
            cpy2: 180,
            endX: 1613,
            endY: 153, 
            rad: 19
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

        var manipulatePixels = function () {
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
                var yLimit = 155;       

                var changePixels = function (index) {
                    pixelData[index++] = r;
                    pixelData[index++] = g;
                    pixelData[index++] = b;
                    pixelData[index++] = a;
                };
        
                for (var y=startY; y<yLimit; y++) {      // rows
                    index = (y * width + currX + offset) * 4;

                    for (var x=currX,z=xLimit; count<thickX; x++,z--) {   // columns                        
                        changePixels(index);
                        index = (y * width + x + offset) * 4;
                        count++;
                            negIndex = (y * width + z - offset) * 4;   
                            changePixels(negIndex);                        
                    }                    
                    offset++;
                    currX++;
                    count = 0;                    
                }
                offset = 0;
                ctx.putImageData(imageData, 0, 0);
            };
        };

        var setup = function () { 
            var canv = document.getElementById('canv');
            var ctx = canv.getContext('2d');              
            var newImage = new Image();
            newImage.src = '/images/ironman-tech2.png';

            // process image on load
            newImage.onload = function () {
                canv.width = newImage.width;
                canv.height = '575';
                var width = canv.width;
                var height = canv.height;
                ctx.drawImage(newImage, 0, 0);

                // Animate box seams
                animateBoxSeam(ctx, topBoxSeam);                
                // animateBoxSeam(ctx, bottomBoxSeam);                
            }
        };

        var toggle = true;
        var animateBoxSeam = function (ctx, item) { 
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgb(0, 0, 255, 255)';
            ctx.moveTo(item.startX, item.startY);
            ctx.lineTo(item.midX, item.midY);     
            ctx.arcTo(item.cpx1, item.cpy1, item.cpx2, item.cpy2, item.rad); 
            ctx.lineTo(item.endX, item.endY);               
            ctx.stroke();

            // Set interval for color transform
            window.setInterval(function () {
                ctx.strokeStyle = toggle ? 'rgb(0, 0, 255, 0)' : 'rgb(0, 0, 255, 255)';
                ctx.stroke();
                toggle = !toggle;
            }, 2000);
        }

        // var colorChange = function () {

        // }


        /*** INITIALIZE ***/

        // Add text and image to the top of the page
        customPageHeaders();

        // Modify pixels for header background
        // manipulatePixels();         
        
        // Initial canvas setup
        setup();        

    });
