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

        var canv = document.getElementById('canv');
        var ctx = canv.getContext('2d');              
        var image = new Image();
        var elementsCount = 0;
        var elementsCounter = 0;
        // var $scope.elementsCount = 0;
        var elements = [];

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
            strokeColor: 'rgb(85,49,16)',
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
            strokeColor: '#fff',
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
            canv = document.getElementById('canv');
            ctx = canv.getContext('2d');              
            image = new Image();
            image.src = '/images/ironman-tech2.png';

            // Object instances
            var outerRadial = new RadialComponent(outerArc);
            elements.push(outerRadial);
            elementsCount++;
            var middleRadial = new RadialComponent(middleArc);
                elements.push(middleRadial);
                elementsCount++;
            var innerRadial = new RadialComponent(innerArc);
                elements.push(innerRadial);
                elementsCount++;
            var leftEyeGlow = new IronManEyes(leftEye);
                elements.push(leftEyeGlow);
                elementsCount++;
            var rightEyeGlow = new IronManEyes(rightEye);
                elements.push(rightEyeGlow);
                elementsCount++;

            // process image on load
            image.onload = function () {
                canv.width = image.width;
                canv.height = '575';
                ctx.drawImage(image, 0, 0);

                // animateBoxSeam(topBoxSeam);
                // animateEyes(leftEye);
                // animateEyes(rightEye);
                // animateRadialComp(outerArc);
                // animateRadialComp(middleArc);
                // animateRadialComp(innerArc);

                // $scope.outerRadial.init();                
                // $scope.middleRadial.init();              
                // $scope.innerRadial.init();

                drawElements();
                             
            };
        };

        var drawElements = function () {
            _.forEach(elements, function (elem) {
                elem.update();
            });
        };

        var clearAndUpdate = function () {
            ctx.clearRect(0, 0, canv.width, canv.height);
            ctx.drawImage(image, 0, 0);
            window.setTimeout(function () {                
                drawElements();
            }, 1000);
        };

        // var AnimateRadialComp = function (item) {
        var RadialComponent = function (item) {
            var currAngle = 0;
            var clearRadialCount = 3;

            this.update = function () {
                currAngle = 0;
                clearRadialCount = 3;
                this.draw();
            };

            this.draw = function () {                
                ctx.beginPath();
                currAngle += item.iterator;
                ctx.lineWidth = item.lineWidth;
                ctx.strokeStyle = item.strokeColor;
                ctx.arc(item.startX, item.startY, item.rad, item.startAngle, currAngle, item.counterClockwise);
                ctx.stroke();
                var animeId = window.requestAnimationFrame(this.draw.bind(this));
                if (currAngle <= -2 * Math.PI || currAngle >= 2 * Math.PI) {
                    // if ((currAngle <= -2 * Math.PI || currAngle >= 2 * Math.PI) && --clearRadialCount <= 0) {
                    window.cancelAnimationFrame(animeId);
                    elementsCounter++;                    
                }
                if (elementsCounter >= elementsCount) {
                    elementsCounter = 0;
                    clearAndUpdate();
                }
            };
        };
        // RadialComponent.prototype.clear = clear;

        var IronManEyes = function (item) {
            var clearEyeCount = 2;

            this.update = function () {
                this.draw();
            };

            this.draw = function () {
                window.setTimeout(function () {                 
                    var currX = item.currX;
                    var currY = item.currY;               
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = '#15738b';
                    ctx.fillStyle = '#fefefe';
                    
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
                    elementsCounter++;

                    if (elementsCounter >= elementsCount) {
                        elementsCounter = 0;
                        clearAndUpdate();
                        // clearEyeCount = 2;
                    }

                }, 8000);  
            };          
        };

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


        /*** WATCHERS ***/

        // $scope.$watch('elementsCount', function (newVal, oldVal) {
        //     if (newVal <= 0) {
        //         clearAndUpdate();
        //     }
        // });

    });
