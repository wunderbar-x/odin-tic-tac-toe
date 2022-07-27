// game board object
const gameBoard = (() => {
    const cellArray = document.querySelectorAll('.gridCell');
    const gameState = ['','','','','','','','','',];
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
        console.log(x.length)
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
                ++xPlayer.winCount
                gameStateReset(gameState);
            }
            else if(x.join('')=='ooo'){
                ++oPlayer.winCount
                gameStateReset(gameState);
            };
        });
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
    return {gameState,};
})();

// display controller object
const displayController = (() => {
    const cellContentArray = document.querySelectorAll('.gridCell p');
    const xWins = document.getElementById('xWins');
    const oWins = document.getElementById('oWins');

    // const xPlayerName = document.getElementById('xPlayerName');
    const xNameDisplay = document.getElementById('xNameDisplay');
    // const oPlayerName = document.getElementById('oPlayerName');
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
    return{updateBoard,updateWinCount,updatePlayerName};
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

displayController.updateBoard(gameBoard.gameState);