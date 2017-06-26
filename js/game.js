function Game() {

    this.board = [];
    this.turn = 1;
    this.nodesBoard = [];

    for (var row = 0; row < 5; row++) {
        for (var col = 0; col < 5; col++) {
            $('.container').append($('<div>')
                .addClass('cell')
                .attr('data-row', row)
                .attr('data-col', col)                
            );          
        }    
    }

    console.log(this.board);    
}

Game.prototype.fillNode = function(_row,_col,_player){

    var node = {
                row: _row, 
                col: _col, 
                player: 1 //_player default -> 1
            };
    
    this.nodesBoard.push(node);
    console.log('------------------------------------');
    console.log("inside fillNode");
    console.log(this.nodesBoard); //[0]
    console.log('------------------------------------');
    
    return node;
}

Game.prototype.pickNode = function(){
    
    $(".cell").on('click', function(e){
        $(this).off(e);
        $(this).addClass('player1');
        $(this).attr( "player", this.turn);
        console.log(this.turn);
        
        console.log('------------------------------------');        
        console.log($(this)[0]);        
        console.log("data-row: " + $(this).attr('data-row'));
        var row = $(this).attr('data-row');
        console.log("data-col: " + $(this).attr('data-col'));
        var col = $(this).attr('data-col');        
        console.log(game.turn);
        console.log('------------------------------------');

        var newNode = game.fillNode(row,col,game.turn);
        console.log('------------------------------------');
        console.log(newNode);
        console.log('------------------------------------');
        
    });
};

Game.prototype.play = function(){

    // player1 === 1
    if (game.turn === 1){
        game.pickNode();
        game.turn = 2;
    } //player2 === 2
    else if (game.turn === 2){
        game.pickNode();
        game.turn = 1;
    }
    

};

var game;

$(document).ready(function() {
    game = new Game(); 
    
    console.log('------------ THIS.TURN -------------');
    console.log(game.turn);
    console.log('------------------------------------');

    game.play();
    console.log('------------ AFTER TURN ------------');
    console.log(game.turn);
    console.log('------------------------------------');


    
    

});
