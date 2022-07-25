const cellArray = document.querySelectorAll('.gridCell');

// game board object
const gameBoard = (() => {
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
    cellArray.forEach((x)=>{
        x.addEventListener('click',()=>{
            let cellNumber = x.getAttribute('data-cell-number') - 1;
            if(gameState[cellNumber]!==''){
                return;
            };
            gameState[cellNumber] = `${determinePlayer()}`;
            console.log(xPlayer.turnCount, oPlayer.turnCount)
            displayController.updateBoard(gameBoard.gameState)
        });
    });
    return {gameState,};
})();

// display controller object
const displayController = (() => {
    const cellContentArray = document.querySelectorAll('.gridCell p');
    const updateBoard = (x) => {
        for(let [i,index] = [x.length,0];i>0;--i,++index){
            cellContentArray[index].textContent = `${x[index]}`;
        };
    }
    return{updateBoard,};
})();

// factory to create players
const PlayerFactory = (boardMark) => {
    let turnCount = 0;
    return {boardMark,turnCount};
};
const xPlayer = PlayerFactory('x');
const oPlayer = PlayerFactory('o');

displayController.updateBoard(gameBoard.gameState);