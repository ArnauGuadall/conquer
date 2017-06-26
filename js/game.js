function Game() {

    this.board = [];
    this.turn = 1;
    //this.nodesBoard = [];

    for (var row = 0; row < 5; row++) {
        for (var col = 0; col < 3; col++) {
            $('.board').append($('<div>')
                .addClass('cell')
                .attr('data-row', row)
                .attr('data-col', col)  
                .attr('player', 0)              
                .attr('troops', 0)
            );          
        }    
    }

    //console.log(this.board);    
}

// Not using it
// Game.prototype.fillNode = function(_row,_col,_player,_troops){

//     var node = {
//                 row: _row, 
//                 col: _col, 
//                 player: 1, // default -> 1
//                 troops: _troops  // default -> 0
//             };
    
//     this.nodesBoard.push(node);
//     console.log('------------------------------------');
//     console.log("inside fillNode");
//     console.log(this.nodesBoard); //[0]
//     console.log('------------------------------------');
    
//     return node;
// };



Game.prototype.expand = function(turn){
    
    $(".cell").on('click', function(){

        $(this).addClass('player1');
        $(this).attr( "player", turn);
        console.log(turn);
        
        console.log('------------------------------------');        
        console.log($(this)[0]);        
        console.log("data-row: " + $(this).attr('data-row'));
        var row = $(this).attr('data-row');
        console.log("data-col: " + $(this).attr('data-col'));
        var col = $(this).attr('data-col');  
        console.log("troops: " + $(this).attr('troops'));      
        var troops = $(this).attr('troops'); 
        console.log("Player turn: " + turn);
        console.log('------------------------------------');

        // Disable all events until Player 1 click next turn
        $(".container").addClass('blocked');
        game.turn = 2;
        console.log("Now the turn is for Player: " + game.turn);
        
    });
};

Game.prototype.getTroops = function(){    

    $(".cell").on('click', function(){
        var troops = $(this).attr('troops');
        
        if ($(this).attr('player') === game.turn){
            console.log('--------- BEFORE INCREASE ----------');
            troops += 3;
            console.log('---------- AFTER INCREASE ----------');
            $(this).attr('troops', troops);
            console.log($(this).attr('troops', troops));
            console.log('------------------------------------');            
        } else {
            alert("This Node is not yours!");
        }
        
    });
};

Game.prototype.swapTurns = function(){

    $("#nextTurn").on('click', function(){
        console.log("am i working?" + game.turn);
        if (game.turn === 1){
            
            console.log("am i working?1");

            //disable all buttons of turn number 1
            $(".turn2 #expand") .prop( "disabled", false);
            $(".turn2 #troops") .prop( "disabled", false);
            $(".turn2 #conquer").prop( "disabled", false);
            //enable all buttons of turn number 2
            $(".turn1 #expand") .prop( "disabled", true );
            $(".turn1 #troops") .prop( "disabled", true );
            $(".turn1 #conquer").prop( "disabled", true );
            game.turn = 2;
        }else if (game.turn === 2){
            console.log("am i working?2");
            $(".turn1 #expand") .prop( "disabled", false);
            $(".turn1 #troops") .prop( "disabled", false);
            $(".turn1 #conquer").prop( "disabled", false);
            //enable all buttons of turn number 2
            $(".turn2 #expand") .prop( "disabled", true );
            $(".turn2 #troops") .prop( "disabled", true );
            $(".turn2 #conquer").prop( "disabled", true );
            game.turn = 1;
        }


        
    });
}

Game.prototype.play = function(){

    // player1 === 1
    if (this.turn === 1){

        $(".turn2 #expand") .prop( "disabled", true);
        $(".turn2 #troops") .prop( "disabled", true);
        $(".turn2 #conquer").prop( "disabled", true);

        $(".turn1 #expand").on('click', function(){            
            game.expand(this.turn);
            $(".turn1 #troops"). prop( "disabled", true );
            $(".turn1 #conquer").prop( "disabled", true );
        });
        
        $(".turn1 #troops").on('click', function(){            
            game.getTroops();
            $(".turn1 #expand"). prop( "disabled", true );
            $(".turn1 #conquer").prop( "disabled", true );
        });

        $(".turn1 #conquer").on('click', function(){            
            game.getTroops();
            $(".turn1 #expand"). prop( "disabled", true );
            $(".turn1 #troops").prop( "disabled", true );
        });                

    } //player2 === 2
    else if (this.turn === 2){
        // game.expand();
        // game.turn = 1;
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

    game.swapTurns();
    

});
