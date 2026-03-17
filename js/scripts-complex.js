var gameBoard = new Array();
var baseNum;
var players = ["Player One","Player Two"];
var playerNum = 0;
var turnCount = 1;
var playerWin = false;

function generateGameBoard() {
    playerNum = 0, turnCount = 1, playerWin = false, gameBoard = [];
    var count = 1;
    var gameBoardHtml = '<div class="game-board-row">';
    while(count <= (baseNum*baseNum)) {
        gameBoardHtml += '<div id="'+ (count) +'" class="game-board-square"></div>';
        if(count%baseNum == 0) {
            gameBoardHtml += '</div>';
            if(count != baseNum*baseNum) {
                gameBoardHtml += '<div class="game-board-row">';
            }
        }
        count++;
    }
    $('#gameBoardDiv').html(gameBoardHtml);
}

// if clicked square is empty, place X or O
function placePlayersMove(chosenSquare) {
    var squareById = $('.game-board-square#'+chosenSquare);
    if(squareById.text()=="") {
        if(playerNum==0) {
            squareById.text('X');
            gameBoard[chosenSquare] = playerNum;
        } else {
            squareById.text('O');
            gameBoard[chosenSquare] = playerNum;
        }
        // start checking for wins after minimum amount of moves neeeded for a win
        if(turnCount<baseNum*baseNum) {
            if(turnCount >= (baseNum*2-1)) {
                checkWin(chosenSquare);
            }

            if(playerWin) {
                resolveGameEnd();
            } else {
                turnCount++
                playerNum = playerNum==0?1:0;
            }
        } else {
            resolveGameEnd();
        }
    }
}

function checkWin(chosenSquare) {
    // horizontal win check
    checkHorizontalWin(chosenSquare);

    // vertical win check
    if(playerWin == false) {
        checkVerticalWin(chosenSquare);
    }

    // diagonal win check
    if(playerWin == false) {
        checkDiagonalWinTopLeftBottomRight(chosenSquare);
    }

    if(playerWin == false) {
        checkDiagonalWinTopRightBottomLeft(chosenSquare);
    }
}

function checkHorizontalWin(chosenSquare) {
    var samePlayer = true;
    var position = chosenSquare;
    // check squares to the left of chosen square
    while(samePlayer && position%baseNum != 1) {
        samePlayer = false;
        position--;
        if(gameBoard[position] == playerNum) {
            samePlayer = true;
        } else {
            samePlayer = false;
        }
    }
    position = chosenSquare;
    // check squares to the right of chosen square
    while(samePlayer && position%baseNum != 0) {
        samePlayer = false;
        position++;
        if(gameBoard[position] == playerNum) {
            samePlayer = true;
        } else {
            samePlayer = false;
        }
    }
    if(samePlayer) playerWin = true;
}

function checkVerticalWin(chosenSquare) {
    var samePlayer = true;
    var position = chosenSquare;
    // check sqaure above chosen square
    while(samePlayer && position >= baseNum) {
        samePlayer = false;
        position-=baseNum;
        if(gameBoard[position] == playerNum) {
            samePlayer = true;
        } else {
            samePlayer = false;
        }
    }
    position = chosenSquare;
    // check squares below chosen square
    while(samePlayer && position <= baseNum*baseNum-baseNum) {
        samePlayer = false;
        position+=baseNum;
        if(gameBoard[position] == playerNum) {
            samePlayer = true;
        } else {
            samePlayer = false;
        }
    }
    if(samePlayer) playerWin = true;
}

function checkDiagonalWinTopLeftBottomRight(chosenSquare) {
    var samePlayer = true;
    var position = chosenSquare;
    // check diagonally between top left and bottom right
    if((position%baseNum)-(Math.floor(position/baseNum)) == 1 || position == baseNum*baseNum) {
        while(samePlayer && position != 1) {
            position-=(baseNum+1);
            if(gameBoard[position] == playerNum) {
                samePlayer = true;
            } else {
                samePlayer = false;
            }
        }
        position = chosenSquare;
        while(samePlayer && position != baseNum*baseNum) {
            position+=(baseNum+1);
            if(gameBoard[position] == playerNum) {
                samePlayer = true;
            } else {
                samePlayer = false;
            }
        }
    } else {
        samePlayer = false;
    }
    if(samePlayer) playerWin = true;
}

function checkDiagonalWinTopRightBottomLeft(chosenSquare) {
    var samePlayer = true;
    var position = chosenSquare;
    // check diagonally between top right and bottom left
    if((position%baseNum)+(Math.floor(position/baseNum)) == baseNum && position != baseNum*baseNum || position == baseNum) {
        while(samePlayer && position != baseNum) {
            position-=(baseNum-1);
            if(gameBoard[position] == playerNum) {
                samePlayer = true;
            } else {
                samePlayer = false;
            }
        }
        position = chosenSquare;
        while(samePlayer && position != baseNum*baseNum-baseNum+1) {
            position+=(baseNum-1);
            if(gameBoard[position] == playerNum) {
                samePlayer = true;
            } else {
                samePlayer = false;
            }
        }
    } else {
        samePlayer = false;
    }
    if(samePlayer) playerWin = true;
}

function resolveGameEnd() {
    if(playerWin) {
        setTimeout(function(){
            alert(players[playerNum] + ' wins!');
        },500);
    } else {
        setTimeout(function(){
            alert ("It's a tie!");
        },500);
    }
}

$(document).ready(function(){
    $('#startGameDiv').on('click',function() {
        var playerOneName = $('#playerOneNameInput').val();
        var playerTwoName = $('#playerTwoNameInput').val();
        if(playerOneName != null && playerOneName != "") {
            players[0] = playerOneName;
        }
        if(playerTwoName != null && playerTwoName != "") {
            players[1] = playerTwoName;
        }
        baseNum = parseInt($('#baseNumInput').val());
        generateGameBoard();
    });

    $('#gameBoardDiv').on('click','.game-board-square',function() {
        if(!playerWin) {
            placePlayersMove(parseInt($(this).attr('id')));
        }
    });
});
