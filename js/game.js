function Game() {

    this.board = [];
    this.turn = 1;
    this.nodesBoard = [];

    for (var row = 0; row < 10; row++) {
        for (var col = 0; col < 10; col++) {
            $('.container').append($('<div>')
                .addClass('cell')
                .attr('data-row', row)
                .attr('data-col', col)                
            );

            this.cell = [
                {
                    row: row, 
                    col: col, 
                    player: this.turn
                }
            ];

            this.board.push(this.cell);            
        }    
    }

    console.log(this.board);    
}

Game.prototype.fillNode = function(_row,_col,_player){

    var node = [
            {
                row: _row, 
                col: _col, 
                player: 1 //_player
            }
        ];
    
    this.nodesBoard.push(node);

    return node;
}

Game.prototype.pickNode = function(){
    
    $(".cell").on('click', function(){
        
        $(this).addClass('player1');
        $(this).attr( "player", this.turn);
        console.log(this.turn);
        
        console.log("=======");        
        console.log($(this)[0]);        
        console.log("data-row: " + $(this).attr('data-row'));
        var row = $(this).attr('data-row');
        console.log("data-col: " + $(this).attr('data-col'));
        var col = $(this).attr('data-col');
        var player = this.turn;
        console.log("=======");


        var newNode = game.fillNode(row,col,player)
        console.log('------------------------------------');
        console.log(newNode[0]);
        console.log('------------------------------------');


    });
};

$(document).ready(function() {
    
    game = new Game();
    console.log(this.turn);
    game.pickNode();

    // player1 === 1
    if (this.turn === 1){
        game.pickNode();
        this.turn = 2;
    } //player2 === 2
    else if (this.turn === 2){
        game.pickNode();
        this.turn = 1;
    }
    

});
