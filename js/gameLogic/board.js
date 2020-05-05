function DartBoard(game) {}

DartBoard.throwDart = function(name, value, multiplier, element) {
    let isDouble = multiplier == 2;
    console.log(isDouble);
    game.addDart(name, value * multiplier,  isDouble);
};

board = new DartBoard();

