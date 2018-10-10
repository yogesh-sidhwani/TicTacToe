/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let winner;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="circle">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
    winner  = findWinner();
    if(winner) {
        return;
    }
}

function findWinner() { 
    let userArray = [];
    let compArray = [];
    let isWinner;
    var boxes = document.getElementsByClassName("box");
    for(var idx = 0; idx < boxes.length; idx++) {
        if(boxes[idx].children.length > 0) {
            let rowIdx = boxes[idx].getAttribute("rowIdx");
            let colIdx = boxes[idx].getAttribute("colIdx");
            let value = boxes[idx].children[0].className;
            value === "cross" ? 
            userArray.push({'rowIdx' : rowIdx, 
                "colIdx" : colIdx, 'value' : value}) :
            compArray.push({'rowIdx' : rowIdx, 
                "colIdx" : colIdx, 'value' : value})
        }
    }
    if(userArray.length >= 3) {
            isWinner =  winningCases(userArray, 'Player X');
    }
    if(compArray.length >= 3 && !isWinner) {
           isWinner = winningCases(compArray, "Player O");
    }
    return isWinner;
}

function checkDiagonal(list) {
    let diag1 = 0, diag2 = 0;
    list.forEach(function(obj) {
        if((obj['rowIdx'] == '0' && obj['colIdx'] == '0')|| 
            (obj['rowIdx'] == '1' && obj['colIdx'] == '1') ||
            (obj['rowIdx'] == '2' && obj['colIdx'] == '2'))
                diag1++;
        else if((obj['rowIdx'] == '0' && obj['colIdx'] == '2')|| 
            (obj['rowIdx'] == '1' && obj['colIdx'] == '1') ||
            (obj['rowIdx'] == '2' && obj['colIdx'] == '0'))
                diag2++;
    });
    if(diag1 >=3 || diag2 >= 3)
        return true;
}

function checkColumns(list) {
    let col0  = 0, col1 = 0, col2 = 0;
    list.forEach(function(obj) {
        if(obj['colIdx'] == '0')
           col0++;
        else if(obj['colIdx'] == '1')
           col1++;
        else 
            col2++;
    });
    if(col0 >=3 || col1 >= 3 || col2 >= 3)
        return true;
    else
        return checkDiagonal(list);
}

function checkRows(list) {
    let row0 = 0, row1 = 0, row2 = 0;
    list.forEach(function(obj) {
        if(obj['rowIdx'] == '0')
           row0++;
        else if(obj['rowIdx'] == '1')
           row1++;
        else 
            row2++;
    });
    if(row0 >=3 || row1 >= 3 || row2 >= 3)
        return true;
    else 
        return checkColumns(list);
}

function winningCases(arr, user) {
    let checkWinner;
    checkWinner = checkRows(arr);
    if(checkWinner) {
        let parent = document.getElementById('gridParent');
        var node = document.createElement("P"); 
        let text = `Winner is ${user}`;                
        var textnode = document.createTextNode(text);
        node.appendChild(textnode);
        if(parent.children.length < 2)
            parent.appendChild(node);
    }
    return checkWinner;
}

function onBoxClick(value) {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    if(value === `comp`) {
        grid[colIdx][rowIdx] = 2; 
    }
    else {
        grid[colIdx][rowIdx] = 1;
        computerMoves();
    }
    renderMainGrid();
    addClickHandlers();
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}
function createCircle(box) {
    if(box && !winner) {
        onBoxClick.call(box,'comp');
    }
    
}

function findEmptyBox() {
    var boxes = document.getElementsByClassName("box");
    for(var idx = 0; idx < boxes.length; idx++) {
        if(boxes[idx].children.length < 1) {
            return boxes[idx];
        }
    }
}

function computerMoves() {
    var rows = document.getElementsByClassName("rowStyle");
    setTimeout( () => {
        if(rows[1].children[1].children.length < 1)
            createCircle(rows[1].children[1]);
        else {
           var emptyBox = findEmptyBox();
           createCircle(emptyBox);
        }
    }, 300);
}

initializeGrid();
renderMainGrid();
addClickHandlers();
