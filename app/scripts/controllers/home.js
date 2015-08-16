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

        /*** DEFAULTS ***/

        $scope.title = 'Front-end Developer';
        $scope.info = '@ Shutterfly';
        $scope.projects = {
            one: false,
            two: false,
            three: false
        };
        var canv = document.getElementById('canv');
        var ctx = canv.getContext('2d');              
        var image = new Image();
        var elementsCount = 0;
        var elementsCounter = 0;
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
            endX: 1600,
            endY: 127, 
            rad: 30
        };  

        var bottomBoxSeam = {
            offsetXleft: 1.35,
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
            endX: 1614,
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
            strokeColor: 'rgba(85,49,16, 0.5)',
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
          

        /*** METHODS ***/

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
            elements.push(new RadialComponent(outerArc));
            elementsCount++;
            elements.push(new RadialComponent(middleArc));
            elementsCount++;
            elements.push(new RadialComponent(innerArc));
            elementsCount++;
            elements.push(new IronManEyes(leftEye));
            elementsCount++;
            elements.push(new IronManEyes(rightEye));
            elementsCount++;
            elements.push(new BoxSeam(topBoxSeam));
            elementsCount++;
            elements.push(new BoxSeam(bottomBoxSeam));
            elementsCount++;

            // process image on load
            image.onload = function () {
                canv.width = image.width;
                canv.height = '575';
                // ctx.globalAlpha = 0.5;
                ctx.drawImage(image, 0, 0);                
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

        var RadialComponent = function (item) {
            var currAngle = 0;

            this.update = function () {
                currAngle = 0;
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
                    window.cancelAnimationFrame(animeId);
                    elementsCounter++;                    
                }
                if (elementsCounter >= elementsCount) {
                    elementsCounter = 0;
                    clearAndUpdate();
                }
            };
        };

        var IronManEyes = function (item) {
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
                    }

                }, 7000);  
            };          
        };

        var BoxSeam = function (item) { 
            var animeId;
            var currX = item.startX;
            var currY = item.startY;

            this.update = function () {
                currX = item.startX;
                currY = item.startY;
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#9ec1fb';
                this.draw();
            };

            this.draw = function () {
                window.setTimeout(animateLeftLine.bind(this), 100);
            };

           
            var animateLeftLine = function () {
                ctx.beginPath();
                ctx.moveTo(item.startX, item.startY);
                ctx.lineTo(currX, currY);
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#9ec1fb';
                ctx.stroke();
                currX += item.offsetXleft;
                currY++;
                animeId = window.setTimeout(animateLeftLine.bind(this), 100);
                if (currX >= item.midX && currY >= item.midY) {
                    window.clearTimeout(animeId);
                    animateMidLine();
                }
            };

            var animateMidLine = function () {
                ctx.beginPath();
                ctx.moveTo(item.midX, item.midY);
                ctx.lineTo(currX, currY);
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#9ec1fb';
                ctx.stroke();
                currX += item.offsetXmid;
                animeId = window.setTimeout(animateMidLine.bind(this), 100);
                if (currX >= item.curveX && currY >= item.curveY) {
                    window.clearTimeout(animeId);
                    animateRightLine();
                }
            };

            var animateRightLine = function () {
                ctx.beginPath();
                ctx.moveTo(item.curveX, item.curveY);
                ctx.lineTo(currX, currY);
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#9ec1fb';
                ctx.stroke();
                currX += item.offsetXright;
                currY--;
                animeId = window.setTimeout(animateRightLine.bind(this), 100);
                if (currX >= item.endX && currY <= item.endY) {
                    window.clearTimeout(animeId);
                    elementsCounter++;
                }

                if (elementsCounter >= elementsCount) {
                    elementsCounter = 0;
                    clearAndUpdate();
                }
            };
         
        };


        /*** INITIALIZE ***/

        // Display canvas element
        $('#canv').css('display', 'inline-block');

        // Add text and image to the top of the page
        customPageHeaders();
        
        // Initial canvas setup
        setup();        

    });
