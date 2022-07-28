// game board object
const gameBoard = (() => {
    const cellArray = document.querySelectorAll('.gridCell');
    const gameState = ['','','','','','','','','',];
    const gameReset=()=>{
        gameStateReset(gameState);
        xPlayer.winCount = 0;
        xPlayer.turnCount = 0;
        oPlayer.winCount = 0;
        oPlayer.turnCount = 0;
        displayController.updateBoard(gameState);
        displayController.updateWinCount();
    };
    const determinePlayer =()=>{
        if(xPlayer.turnCount<=oPlayer.turnCount){
            ++xPlayer.turnCount
            return xPlayer.boardMark;
        }
        else if(oPlayer.turnCount<xPlayer.turnCount){
            ++oPlayer.turnCount
            return oPlayer.boardMark;
        };
    };
    const gameStateReset=(x)=>{
        for(let i=x.length-1;i>=0;--i){
            x[i] = '';
        };
    };
    const winCheck=()=>{
        const winCombos = [
            [gameState[0],gameState[1],gameState[2]],
            [gameState[3],gameState[4],gameState[5]],
            [gameState[6],gameState[7],gameState[8]],
            [gameState[0],gameState[3],gameState[6]],
            [gameState[1],gameState[4],gameState[7]],
            [gameState[2],gameState[5],gameState[8]],
            [gameState[0],gameState[4],gameState[8]],
            [gameState[2],gameState[4],gameState[6]]
        ]
        winCombos.forEach((x)=>{
            if(x.join('')=='xxx'){
                ++xPlayer.winCount;
                gameStateReset(gameState);
                displayController.winMessage(xPlayer.playerName);
            }
            else if(x.join('')=='ooo'){
                ++oPlayer.winCount;
                displayController.winMessage(oPlayer.playerName);
                (gameStateReset(gameState));
            };
        }); 
        if(gameState.every((x)=>{return x!=='';})==true){
            displayController.winMessage('tie');
            gameStateReset(gameState);
        }
    };
    // adds a function to each grid cell that changes the corresponding gamestate index and then updates the grid
    cellArray.forEach((x)=>{
        x.addEventListener('click',()=>{
            let cellNumber = x.getAttribute('data-cell-number') - 1;
            if(gameState[cellNumber]!==''){
                return;
            };
            gameState[cellNumber] = `${determinePlayer()}`;
            winCheck();
            displayController.updateWinCount();
            // display win message (5 sec timer?)
            displayController.updateBoard(gameBoard.gameState)
        });
    });
    return {gameState,gameReset};
})();

// display controller object
const displayController = (() => {
    const cellContentArray = document.querySelectorAll('.gridCell p');
    const xWins = document.getElementById('xWins');
    const oWins = document.getElementById('oWins');
    const overlay = document.querySelector('.overlay');
    const overlayMessage = document.querySelector('.overlay h1');
    const xNameDisplay = document.getElementById('xNameDisplay');
    const oNameDisplay = document.getElementById('oNameDisplay');

    const updateBoard = (x) => {
        for(let [i,index] = [x.length,0];i>0;--i,++index){
            cellContentArray[index].textContent = `${x[index]}`;
        };
    }
    const updateWinCount=()=>{
        xWins.textContent = `WINS:${xPlayer.winCount}`;
        oWins.textContent = `WINS:${oPlayer.winCount}`;
    };
    const winMessage=(x)=>{
        overlay.style.visibility='visible';
        if(x=='tie'){
            overlayMessage.textContent='its a tie.'
        }
        else if(x!=='tie'){
        overlayMessage.textContent=`${x} has won!`;
        }
        const okayButton = document.querySelector('.okay');
        okayButton.addEventListener('click',()=>{
            overlay.style.visibility='hidden';
        })
    }
    const updatePlayerName=(input,player)=>{
        player.playerName = input.value;
        if(player==xPlayer){
            xNameDisplay.textContent = `${player.playerName} - X`;
        }
        else if(player==oPlayer){
            oNameDisplay.textContent = `${player.playerName} - O`;
        };
        input.value = '';
    };
    return{updateBoard,updateWinCount,updatePlayerName,winMessage};
})();

// factory to create players
const PlayerFactory = (boardMark,name) => {
    let turnCount = 0;
    let winCount = 0;
    let playerName = name;
    return {boardMark,turnCount,winCount,playerName,};
};

const xPlayer = PlayerFactory('x','player1');
const oPlayer = PlayerFactory('o','player2');