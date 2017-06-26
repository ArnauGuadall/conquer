function Game() {

    this.board = [];
    this.turn = 1;    

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

}


Game.prototype.expand = function(){
    
    $(".cell").on('click', function(){

        if (game.turn === 1){
            $(this).addClass('player1');
            
        } else {
            $(this).addClass('player2');
            
        }
        $(".container").addClass('blocked');
        $(this).attr( "player", game.turn);        
        
        console.log('------------------------------------');        
        console.log($(this)[0]);        
        console.log("data-row: " + $(this).attr('data-row'));        
        console.log("data-col: " + $(this).attr('data-col'));
        console.log("troops: "   + $(this).attr('troops'));              
        console.log("Player turn: " + game.turn);
        console.log('------------------------------------');

        // Disable all events until Player 1 click next turn
        
        //game.turn = 2;

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
        
        if (game.turn === 1){

            //$(".container").removeClass('blocked');            

            //disable all buttons of turn number 1
            $(".turn2 #expand") .prop( "disabled", false);
            $(".turn2 #troops") .prop( "disabled", false);
            $(".turn2 #conquer").prop( "disabled", false);

            //enable all buttons of turn number 2
            $(".turn1 #expand") .prop( "disabled", true );
            $(".turn1 #troops") .prop( "disabled", true );
            $(".turn1 #conquer").prop( "disabled", true );

            game.turn = 2;
            console.log("next turn it will be player2? : " + game.turn);
            console.log('------------------------------------');
            
        }else if (game.turn === 2){            
            
            $(".turn1 #expand") .prop( "disabled", false);
            $(".turn1 #troops") .prop( "disabled", false);
            $(".turn1 #conquer").prop( "disabled", false);

            //enable all buttons of turn number 2
            $(".turn2 #expand") .prop( "disabled", true );
            $(".turn2 #troops") .prop( "disabled", true );
            $(".turn2 #conquer").prop( "disabled", true );

            game.turn = 1;
            console.log("next turn it will be.. player1? : " + game.turn);
            console.log('------------------------------------');
        }

        $(".container").removeClass('blocked');
        
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
            $(".turn1 #expand"). prop( "disabled", true );
            $(".turn1 #troops"). prop( "disabled", true );
            $(".turn1 #conquer").prop( "disabled", true );
        });
        
        $(".turn1 #troops").on('click', function(){            
            game.getTroops();
            $(".turn1 #expand"). prop( "disabled", true );
            $(".turn1 #troops"). prop( "disabled", true );
            $(".turn1 #conquer").prop( "disabled", true );
        });

        $(".turn1 #conquer").on('click', function(){            
            game.getTroops();            
            $(".turn1 #expand"). prop( "disabled", true );
            $(".turn1 #troops"). prop( "disabled", true );
            $(".turn1 #conquer").prop( "disabled", true );
        });                

    } else if (this.turn === 2){

        $(".turn1 #expand") .prop( "disabled", true);
        $(".turn1 #troops") .prop( "disabled", true);
        $(".turn1 #conquer").prop( "disabled", true);

        $(".turn2 #expand").on('click', function(){            
            game.expand(this.turn);
            $(".turn2 #expand"). prop( "disabled", true );
            $(".turn2 #troops"). prop( "disabled", true );
            $(".turn2 #conquer").prop( "disabled", true );
        });
        
        $(".turn2 #troops").on('click', function(){            
            game.getTroops();
            $(".turn2 #expand"). prop( "disabled", true );
            $(".turn2 #troops"). prop( "disabled", true );
            $(".turn2 #conquer").prop( "disabled", true );
        });

        $(".turn2 #conquer").on('click', function(){            
            game.getTroops();            
            $(".turn2 #expand"). prop( "disabled", true );
            $(".turn2 #troops"). prop( "disabled", true );
            $(".turn2 #conquer").prop( "disabled", true );
        });
    }

};

var game;

$(document).ready(function() {
    
    game = new Game(); 
    
    game.play();
    game.swapTurns();    

});
