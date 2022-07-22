// Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory.
// Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module.
// If you need multiples of something (players!), create them with factories.

const gridCont = document.querySelector('.gridCont');

// game board object
const gameBoard = (() => {
    const gameState = ['x','o','x','o','x','o','x','o','x'];
    return {gameState,};
})();

// display controller object
const displayController = (() => {
    const updateBoard = (x) => {
        for(let [i,index] = [x.length,0];i>0;--i,++index){
            const gridCell = document.createElement('div');
            gridCell.classList.add('gridCell');
            gridCell.setAttribute('data-cell-number',`${index + 1}`); // *
            const cellContent = document.createElement('p')
            cellContent.textContent = `${x[index]}`;
            gridCell.appendChild(cellContent);
            gridCont.appendChild(gridCell);
        }
    }
    return{updateBoard,};
})();


// factory to create players
const PlayerFactory = () => {
    
};
displayController.updateBoard(gameBoard.gameState);
console.log();