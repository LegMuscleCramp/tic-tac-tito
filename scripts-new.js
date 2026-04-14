const tttGame = {
    players: ["Player One","Player Two"],
    playerNum: 0,
    turnCount: 10,
    playerWin: false,
    winConditions: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]    
    ],

    init: function() {
        
    },

    startGame: function() {

    },

    placePlayersMove: function(chosenSquare) {

    },

    checkWin: function(currentPlayer) {

    }, 

    endGame: function() {
        
    }
}

document.querySelectorAll('.tic-tac-tito-game')
.forEach(tttGame.init());

const gameBoard = new Array();
var players = ["Player One","Player Two"];
var playerNum = 0;
var turnCount = 10;
var playerWin = false;
var possibleWins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function startGame() {
    var playerOneName = $('#playerOneNameInput').val().trim();
    var playerTwoName = $('#playerTwoNameInput').val().trim();
    if(playerOneName!=null && playerOneName!="") {
        players[0] = playerOneName;
    } else {
        players[0] = "Player One";
    }
    if(playerTwoName!=null && playerTwoName!="") {
        players[1] = playerTwoName;
    } else {
        players[1] = "Player Two";
    }
    playerNum = 0, turnCount = 1, playerWin = false, gameBoard = [];
    $('.game-board-square').text('').removeClass('cinnabar middle-blue');
    $('.pregame-screen').addClass('hidden');
    $('#playerTurn').removeClass('gunmetal').addClass('cinnabar').text(players[playerNum] +"'s turn");
}

// if clicked square is empty, place X or O
function placePlayersMove(chosenSquare) {
    var squareById = $('.game-board-square#'+chosenSquare);
    if(squareById.text()=="") {
        if(playerNum==0) {
            squareById.addClass('cinnabar').text('X');
            gameBoard[chosenSquare] = playerNum;
        } else {
            squareById.addClass('middle-blue').text('O');
            gameBoard[chosenSquare] = playerNum;
        }
        // start checking for wins after minimum amount of moves neeeded for a win
        if(turnCount>=5) {
            checkWin(playerNum);
        }
        if(playerWin || turnCount==9) {
            endGame();
        } else {
            turnCount++
            if(playerNum==0) {
                playerNum = 1;
                $('#playerTurn').removeClass('cinnabar').addClass('middle-blue');
            } else {
                playerNum = 0;
                $('#playerTurn').removeClass('middle-blue').addClass('cinnabar');
            }
            $('#playerTurn').text(players[playerNum] +"'s turn");
        }
    }
}

function checkWin(currentPlayer) {
    var counter = 0;
    while(!playerWin && counter<possibleWins.length) {
        var currentWin = possibleWins[counter];
        var a = gameBoard[currentWin[0]],
        b = gameBoard[currentWin[1]],
        c = gameBoard[currentWin[2]];
        if(currentPlayer==a && currentPlayer==b && currentPlayer==c) {
            playerWin = true;
            counter = possibleWins.length;
        } else {
            counter++;
        }
    }
}

function endGame() {
    $('#playerTurn').text('.').removeClass('cinnabar middle-blue').addClass('gunmetal');
    var winner;
    if(playerWin) {
        winner = players[playerNum] +" wins!";
    } else {
        winner = "It's a tie!";
    }
    setTimeout(function(){
        $('.popup>p').text(winner);
        $('#startGameDiv').text('Play Again?');
        $('.pregame-screen').removeClass('hidden');
    },500);
    turnCount = 10;
}

$(document).ready(function(){
    $('#startGameDiv').on('click',function() {
        startGame();
    });

    $('.game-board-square').on('click',function() {
        if(!playerWin && turnCount <= 9) {
            placePlayersMove(parseInt($(this).attr('id')));
        }
    });

    $('#playAgainDiv').on('click',function(){
        startGame();
    });
});
