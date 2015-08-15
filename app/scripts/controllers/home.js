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
        var toggleBox = true;
        var clearEyeCount = 2;
        var clearRadialCount = 3;

        // Canvas items        
        var topBoxSeam = {
            offsetXleft: 1.7,
            offsetXmid: 1,
            offsetXright: 1.4,
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
            offsetXleft: 1.5,
            offsetXmid: 1,
            offsetXright: 1.2,
            startX: 1535,
            startY: 156,
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

        var leftEye = {
            startX: 872,
            startY: 254,
            currX: 940,
            currY: 265,
            offsetsX: [
                -5, 
                -30, 
                -20, 
                -15, 
                4
            ],
            offsetsY: [
                11, 
                5, 
                -3, 
                -9, 
                -15
            ]
        };     

        var rightEye = {
            startX: 1064,
            startY: 254,
            currX: 996,
            currY: 265,
            offsetsX: [
                5, 
                30, 
                20, 
                15, 
                -4
            ],
            offsetsY: [
                11, 
                5, 
                -3, 
                -9, 
                -15
            ]
        }; 

        var outerArc = {
            startX: 505,
            startY: 350,
            rad: 145,
            startAngle: 0,                
            endAngle: 2 * Math.PI,
            iterator: 0.01,
            strokeColor: 'rgb(66,38,12)',
            lineWidth: 4,
            counterClockwise: false
        }; 

        var middleArc = {
            startX: 505,
            startY: 350,
            rad: 65,
            startAngle: 0,                
            endAngle: 2 * Math.PI,
            iterator: -0.01,
            strokeColor: 'rgb(190,138,35)',
            lineWidth: 4,
            counterClockwise: true
        };   

        var innerArc = {
            startX: 505,
            startY: 350,
            rad: 27,
            startAngle: 0,                
            endAngle: 2 * Math.PI,
            iterator: 0.01,
            strokeColor: 'rgb(117,117,117)',
            lineWidth: 1,
            counterClockwise: false
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

                // animateBoxSeam(topBoxSeam);
                // animateEyes(leftEye);
                // animateEyes(rightEye);
                animateRadialComp(outerArc);
                animateRadialComp(middleArc);
                animateRadialComp(innerArc);
                             
            };
        };

        var clear = function (animateItemFn, items) {
            window.setTimeout(function () {
                $scope.ctx.clearRect(0, 0, $scope.canv.width, $scope.canv.height);
                $scope.ctx.drawImage($scope.newImage, 0, 0);
                _.forEach(items, function (item) {
                    animateItemFn(item);
                })
            }, 1000);
        }

        var animateRadialComp = function (item) {
            var canv = $scope.canv;
            var ctx = $scope.ctx;
            var image = $scope.newImage; 
            var iterator = item.iterator;
            ctx.lineWidth = item.lineWidth;
            ctx.strokeStyle = item.strokeColor;
            
            var drawArc = function () {
                ctx.beginPath();
                currAngle += iterator;
                ctx.arc(item.startX, item.startY, item.rad, item.startAngle, currAngle, item.counterClockwise);
                ctx.stroke();
                var animeId = window.requestAnimationFrame(drawArc);
                if (currAngle >+ 2 * Math.PI && --clearRadialCount <= 0) {
                    window.cancelAnimationFrame(animeId);
                    clear(animateRadialComp, [item]);
                    clearRadialCount = 3;
                }
            };

            ctx.beginPath();
            var currAngle = iterator;
            ctx.arc(item.startX, item.startY, item.rad, item.startAngle, currAngle, item.counterClockwise);
            ctx.stroke();
            window.requestAnimationFrame(drawArc);
        };

        var animateEyes = function (item) {
            window.setTimeout(function () {
                var canv = $scope.canv;
                var ctx = $scope.ctx;
                var image = $scope.newImage; 
                var currX = item.currX;
                var currY = item.currY;               
                ctx.lineWidth = 4;
                ctx.strokeStyle = '#15738b';
                ctx.fillStyle = '#fefefe';
                ctx.save();
                ctx.beginPath();
                
                ctx.moveTo(item.startX, item.startY);
                ctx.lineTo(currX, currY);
                for (var i=0; i<item.offsetsX.length; i++) {
                    currX = currX + item.offsetsX[i]; 
                    currY = currY + item.offsetsY[i];
                    ctx.lineTo(currX, currY);
                }

                ctx.fill();
                ctx.stroke();
                ctx.restore();

                if (--clearEyeCount <= 0) {
                    clear(animateEyes, [leftEye, rightEye]);
                    clearEyeCount = 2;
                }

            }, 5000);            
        }

        var animateBoxSeam = function (item) { 
            var canv = $scope.canv;
            var ctx = $scope.ctx;
            var image = $scope.newImage;
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#9ec1fb';
            var currX = item.startX;
            var currY = item.startY;
            ctx.beginPath();
            ctx.moveTo(item.startX, item.startY);
            var animeId;

            var animateLeftLine = function () {
                ctx.lineTo(currX, currY);
                ctx.stroke();
                currX += item.offsetXleft;
                currY++;
                animeId = window.setTimeout(animateLeftLine, 100);
                if (currX >= item.midX && currY >= item.midY) {
                    window.clearTimeout(animeId);
                    animateMidLine();
                }
            };

            var animateMidLine = function () {
                ctx.lineTo(currX, currY);
                ctx.stroke();
                currX += item.offsetXmid;
                animeId = window.setTimeout(animateMidLine, 100);
                if (currX >= item.curveX && currY >= item.curveY) {
                    window.clearTimeout(animeId);
                    animateRightLine();
                }
            };

            var animateRightLine = function () {
                ctx.lineTo(currX, currY);
                ctx.stroke();
                currX += item.offsetXright;
                currY--;
                animeId = window.setTimeout(animateRightLine, 100);
                if (currX >= item.endX && currY <= item.endY) {
                    window.clearTimeout(animeId);
                    ctx.clearRect(0, 0, canv.width, canv.height);
                    ctx.drawImage(image, 0, 0);
                    if (toggleBox) {
                        animateBoxSeam(topBoxSeam);
                    } else {
                        animateBoxSeam(bottomBoxSeam);  
                    }
                    toggleBox = !toggleBox;
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
