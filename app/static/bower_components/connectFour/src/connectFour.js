define(['angular', 'text!./connectFour.html', 'text!./connectFour.css', 'text!./sprites.css'], function (angular, connectFourTemplate, connectFourCss, spritesCss) {

    'use strict';

    /**
     * @ngdoc function
     * @name mywebsiteApp.directive:connectFour
     * @description
     * # connectFour
     * Directive of the mywebsiteApp
     */

    angular.module('connectFourApp.directives.connectFour', [])
        .directive('connectFour', function () {
            var obj = {
                restrict: 'E',
                // templateUrl: template,
                template: connectFourTemplate,
                // css: connectFourCss,
                link: function (css) {

                    // Dynamically add css to app
                    if ($('body>style').length === 0) {
                        $('body').prepend('<style>' + connectFourCss + spritesCss + '</style>');
                    }

                    // Module
                    var connectModule = (function() {
                        var player1,
                            player2,
                            p1arrow,
                            p2arrow,
                            p1chip,
                            p2chip,
                            p1count = 1,
                            p2count = 1,
                            currPlayer,
                            currArrow,
                            currChip,
                            currCount = 1,
                            rows,
                            cols,
                            beginSlot = '15px',
                            slot,
                            endMove = false,
                            firstDownIncrement = 121,
                            firstRightIncrement = 81,
                            slideIncrement = 102,
                            bdArray = [],
                            cssImage = {},
                            tempSlot,
                            evt,
                            sectionWon = [],
                            magicNum = 4;


                        function createBoard(userRows, userCols) {
                            rows = userRows;
                            cols = userCols;

                            for (var r = 1; r <= rows; r++) {
                              bdArray[r] = [];
                              for (var c = 1; c <= cols; c++) {
                                bdArray[r].push(false);
                                $('#board').append("<div class='tile'></div>");
                              }
                            }

                            // hide all pieces
                            $('.arrows').hide();
                            $('.chips').hide();
                        }

                        function assignColor() {
                            $('.red').on('click', function() {
                                player1 = 'red';
                                player2 = 'yellow';
                                $(this).attr('disabled', true);
                                $('.yellow').attr('disabled', false);
                            });
                            $('.yellow').on('click', function() {
                                player1 = 'yellow';
                                player2 = 'red';
                                $(this).attr('disabled', true);
                                 $('.red').attr('disabled', false);
                            });
                        }

                        function newGame(userRows, userCols) {
                            createBoard(userRows, userCols);
                            assignColor();

                            $('.start').on('click', function() {
                                $(this).parent().hide();
                                p1arrow = $('#' + player1 + '-arrow');
                                p2arrow = $('#' + player2 + '-arrow');
                                p1chip = $('#' + player1 + '-chip');
                                p2chip = $('#' + player2 + '-chip');
                                currPlayer = player1;
                                currArrow = p1arrow;
                                currChip = p1chip;
                              
                                currArrow.show();
                                $(window).on('keydown', move);
                            });
                        }

                        function move() {
                            evt = arguments[0];
                            // arrow left
                            if (evt.which === 37) {
                                if (currCount - 1 <= 0) {   // check for left boundary
                                    currArrow.removeClass('move' + currCount);
                                    currCount = cols;
                                    currArrow.addClass('move' + currCount);
                                    currChip.css('left', (currCount - 1) * slideIncrement);
                                }
                                else {
                                    currArrow.removeClass('move' + currCount);
                                    currArrow.addClass('move' + --currCount);
                                    tempSlot = currChip.css('left').replace('px', '') - slideIncrement;
                                    currChip.css('left', tempSlot);
                                }
                            }
                            // arrow right
                            else if (evt.which === 39) {
                                if (currCount + 1 > cols) {   // check for right boundary
                                    currArrow.removeClass('move' + currCount);
                                    currCount = 1;
                                    currArrow.addClass('move' + currCount);
                                    currChip.css('left', firstRightIncrement);
                                }
                                else {
                                    currArrow.removeClass('move' + currCount);
                                    currArrow.addClass('move' + ++currCount);
                                    currChip.css('left', firstRightIncrement + (currCount - 1) * slideIncrement);
                                }
                            }
                            // spacebar
                            else if (evt.which === 32) {
                                currArrow.hide();
                                currChip.show();

                                // slide chip down
                                var i = rows;
                                while (i > 0) {
                                    if (bdArray[i][currCount]) {
                                        i--;
                                    }
                                    else {
                                        bdArray[i][currCount] = currPlayer;

                                        $(window).off('keydown', move);   // remove event handler to prevent moves
                                        currChip.animate({
                                        top: firstDownIncrement + ((i - 1) * slideIncrement)
                                        }, 2000, function() {
                                            // equation to resolve row and column of slot: [( r-1 ) * cols ] + c
                                            slot = ((i - 1) * cols) + currCount;
                                            // add a permanent chip to slot and return original pos
                                            currChip.css('top', beginSlot).hide();
                                            // resolve which chip image to use
                                            if (currPlayer === 'red') {
                                                cssImage = {
                                                    "background-image": "url('bower_components/connectFour/src/sprites.png')",
                                                    "background-position": "-14px -14px"
                                                };
                                            }
                                            else if (currPlayer === 'yellow') {
                                                cssImage = {
                                                    "background-image": "url(bower_components/connectFour/src/sprites.png)",
                                                    "background-position": "-151px -16px"
                                                };
                                            }
                                            $("#board > div:nth-child(" + slot + ")").css(cssImage);

                                            // check for winner
                                            winner(i, currCount, currPlayer, 0);

                                            // next player's turn
                                            if (currPlayer === player1) {
                                            currPlayer = player2;
                                            currArrow = p2arrow;
                                            currChip = p2chip;
                                            p1count = currCount;
                                            currCount = p2count;
                                            }
                                            else {   // === player2
                                            currPlayer = player1;
                                            currArrow = p1arrow;
                                            currChip = p1chip;
                                            p2count = currCount;
                                            currCount = p1count;
                                            }

                                            currArrow.show();
                                            $(window).on('keydown', move);   // re-allow player moves
                             
                                        });
                                        break;
                                    }
                                }
                            }
                        }

                        // check for horizontal, veritical, diagonal winner
                        function winner(row, col, player, num) {
                            // var horiz = horizontal(row, col, player, 0, true);
                            // var vert = vertical(row, col, player, 0, true);
                            //var diag1 = diagonal(row, col, player, 0, true, true);  // right-down
                            //var diag2 = diagonal(row, col, player, 0, true, false); // left-down

                            if (horizontal(row, col, player, 0, true) >= magicNum || vertical(row, col, player, 0, true) >= magicNum || diagonal(row, col, player, 0, true, true) >= magicNum || diagonal(row, col, player, 0, true, false) >= magicNum) {
                                // highlight winning chips
                                for (var z = 0; z < magicNum; z++) {
                                    slot = ((sectionWon[z].row - 1) * cols) + sectionWon[z].col;
                                    console.log('THE WINNER IS ' + slot);
                                    $("#board > div:nth-child(" + slot + ")").addClass('winChips');
                                }
                                startOver(player);
                            }
                        }

                        function diagonal(row, col, player, num, positive, isRightDown) {
                            var set = 0,
                                isForward = positive,
                                winningNum = magicNum,
                                incRow,
                                incCol,
                                reverseCheck;

                            if (num === winningNum) {
                              return 0;
                            }

                            // check for boundaries
                            if (row > rows || row <= 0) {
                                console.log('row ' + row + ' is out of bounds...');
                                return 0;
                            }
                            else if (col > cols || col <= 0) {
                                console.log('col ' + col + ' is out of bounds...');
                                return 0;
                            }

                            // specify direction of diagonal check
                            if (isRightDown) {
                                incRow = 1;
                                incCol = 1;
                                reverseCheck = (row - incRow > 0) && (col - incCol > 0);
                            }
                            else {
                                incRow = 1;
                                incCol = -1;
                                reverseCheck = (row - incRow > 0) && (col - incCol <= 7);
                            }

                            // right diagonal checker
                            if (isForward && bdArray[row][col] === player) {  
                                sectionWon.push({
                                    row: row,
                                    col: col
                                });
                                set++;
                                set += diagonal(row + incRow, col + incCol, player, num + 1, true, isRightDown);
                                console.log('move+: ' + '[' + row + ']' + '[' + col + ']' + ' with set: ' + set);
                            }
                            else if (isForward) {
                                return 0;
                            }
                           
                            if (num === 0) {
                                isForward = false;
                            }

                            // left diagonal checker
                            if (!isForward && set !== winningNum) { 
                                if (reverseCheck && bdArray[row - incRow][col - incCol] === player) {  
                                    sectionWon.push({
                                        row: row - incRow,
                                        col: col - incCol
                                    });
                                    set++;
                                    set += diagonal(row - incRow, col - incCol, player, set, false, isRightDown);
                                    console.log('move-: ' + '[' + (row-incRow) + ']' + '[' + (col-incCol) + ']' + ' with set: ' + set);
                                } else if (num === 0 && set <= winningNum - 1) {   // -1 bc very first element already included
                                    sectionWon = [];
                                }
                            }

                            return set;
                        }

                        function horizontal(row, col, player, num, positive) {
                            var set = 0,
                                isForward = positive,
                                winningNum = magicNum;

                            if (num === winningNum) {
                                return 0;
                            }

                            // check for boundaries
                            if (row > rows || row <= 0) {
                                console.log('row ' + row + ' is out of bounds...');
                                return 0;
                            }
                            else if (col > cols || col <= 0) {
                                console.log('col ' + col + ' is out of bounds...');
                                return 0;
                            }

                            if (isForward && bdArray[row][col] === player) {  
                                sectionWon.push({
                                    row: row,
                                    col: col
                                });
                                set++;
                                set += horizontal(row, col + 1, player, num + 1, true);
                                console.log('move+: ' + '[' + row + ']' + '[' + col + ']' + ' with set: ' + set + ' and winning columns ' + sectionWon[num].col);
                            }
                            else if (isForward) {
                                return 0;
                            }
                           
                            if (num === 0) {
                                isForward = false;
                            }

                            if (!isForward && set !== winningNum) { 
                                if ((col - 1 > 0) && bdArray[row][col - 1] === player) {  
                                    sectionWon.push({
                                        row: row,
                                        col: col - 1
                                    });
                                    set++;
                                    set += horizontal(row, col - 1, player, set, false);
                                    console.log('move-: ' + '[' + row + ']' + '[' + (col-1) + ']' + ' with set: ' + set);
                                } else if (num === 0 && set <= winningNum - 1) {   // -1 bc very first element already included
                                    sectionWon = [];
                                } 
                            }

                            return set;
                        }

                        function vertical(row, col, player, num, positive) {
                            var set = 0,
                                isForward = positive,
                                winningNum = magicNum;

                            if (num === winningNum) {
                                return 0;
                            }

                            // check for boundaries
                            if (row > rows || row <= 0) {
                                console.log('row ' + row + ' is out of bounds...');
                                return 0;
                            }
                            else if (col > cols || col <= 0) {
                                console.log('col ' + col + ' is out of bounds...');
                                return 0;
                            }

                            if (isForward && bdArray[row][col] === player) {  
                                set++;
                                set += vertical(row + 1, col, player, num + 1, true);
                                console.log('move+: ' + '[' + row + ']' + '[' + col + ']' + ' with set: ' + set);
                                sectionWon.push({
                                    row: row,
                                    col: col
                                });
                            }
                            else if (isForward) {
                                return 0;
                            }
                           
                            if (num === 0) {
                                isForward = false;
                            }

                            if (!isForward && set !== winningNum) { 
                                if ((row - 1 > 0) && bdArray[row - 1][col] === player) {  
                                    set++;
                                    set += vertical(row - 1, col, player, set, false);
                                    console.log('move-: ' + '[' + (row-1) + ']' + '[' + col + ']' + ' with set: ' + set);
                                    sectionWon.push({
                                        row: row,
                                        col: col
                                    });
                                } else if (num === 0 && set <= winningNum - 1) {   // -1 bc very first element already included
                                    sectionWon = [];
                                } 
                            }

                            return set;
                        }

                        function startOver(winner) {
                            console.log('WINNER: ' + winner);
                            if (winner === player1) {
                                alert('Player 1 wins!');
                            }
                            else {
                                alert('Player 2 wins!');
                            }

                            if (confirm('Do you want to play again?')) {
                                location.reload();
                                // newGame(6, 7);
                            }
                            else {
                                alert('Thanks for playing!');
                            }
                        }

                        return {
                            newGame: newGame 
                        };
                    })();


                    /*** INITIALIZE ***/

                    // Keep initial state of game board
                    var holdElem = document.getElementById('game-board');
                    var initialState = holdElem.cloneNode(true);

                    // Trigger a game restart on event
                    // $('.restart').on('click', function () {
                    //     // connectModule.newGame(6, 7);                        
                    //     document.getElementById('game-board').remove();
                    //     document.getElementById('connectFour').appendChild(initialState);
                    // });

                    // Call methods
                    connectModule.newGame(6, 7);

                }
            };

            return obj;
        });
});