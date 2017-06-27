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
                .append($('<h1>')
                .addClass('h1-class'))
            );  
                    
        }    
    }

}

Game.prototype.setEvents = function() {
    
    

}

Game.prototype.moreTroops = function(){    

    $(".cell").on('click', function(){

        var troops = $(this).attr('troops');
        console.log('----------- MORE TROOPS ------------');
        console.log("troops: " + troops);
        console.log("moreTroops game turn: " + game.turn);
        console.log("attr Player: " + $(this).attr('player'))
                
        if ($(this).attr('player') == game.turn){            
            troops += 3;            
            console.log("next is the attr troops");
            $(this).attr('troops', troops);            
            console.log($(this).attr('troops', troops));            
        } else {
            alert("This Node is not yours!");
        }

        console.log('-------- END MORE TROOPS ------------');
        $(".board").addClass('blocked');

    });
};

Game.prototype.expand = function(){
    
    $(".cell").on('click', function(){        

        if (game.turn === 1){ $(this).addClass('player1'); } 
        else { $(this).addClass('player2'); }

        $(this).attr( "player", game.turn);   
        $(this).attr( "troops", 1);    
        
        ($(this)[0].children[0]).innerHTML = $(this).attr('troops');
        
        console.log('-------------- EXPAND --------------');        
        console.log($(this)[0]);        
        console.log("data-row: " + $(this).attr('data-row'));        
        console.log("data-col: " + $(this).attr('data-col'));
        console.log("troops: "   + $(this).attr('troops'));              
        console.log("Player turn: " + game.turn);
        console.log('------------------------------------');

        // Disable board events until Player click next turn        
        $(".board").addClass('blocked');

    });
};

Game.prototype.swapTurns = function(){

    $("#nextTurn").on('click', function(){
        
        if (game.turn === 1){                  

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
            
            $(".turn1 #expand") .prop( "disabled", true);
            $(".turn1 #troops") .prop( "disabled", true);
            $(".turn1 #conquer").prop( "disabled", true);

            //enable all buttons of turn number 2
            $(".turn2 #expand") .prop( "disabled", false );
            $(".turn2 #troops") .prop( "disabled", false );
            $(".turn2 #conquer").prop( "disabled", false );

            game.turn = 1;            
        }

        console.log('----------- SWAP TURNS -------------');
        console.log("next turn it will be player2? : " + game.turn);
        console.log('------------------------------------');

        game.play();
        
    });
}

Game.prototype.play = function(){
    
    // player1 === 1
    if (this.turn === 1){

        $(".turn1 #expand") .prop( "disabled", false);
        $(".turn1 #troops") .prop( "disabled", false);
        $(".turn1 #conquer").prop( "disabled", false);
        $(".turn2 #expand") .prop( "disabled", true);
        $(".turn2 #troops") .prop( "disabled", true);
        $(".turn2 #conquer").prop( "disabled", true);

        $(".turn1 #expand").on('click', function(){        
            $(".board").removeClass('blocked');    
            game.expand();
            $(".turn1 #expand"). prop( "disabled", true );
            $(".turn1 #troops"). prop( "disabled", true );
            $(".turn1 #conquer").prop( "disabled", true );
        });
        
        $(".turn1 #troops").on('click', function(){   
            $(".board").removeClass('blocked');          
            game.moreTroops();
            $(".turn1 #expand"). prop( "disabled", true );
            $(".turn1 #troops"). prop( "disabled", true );
            $(".turn1 #conquer").prop( "disabled", true );
        });

        $(".turn1 #conquer").on('click', function(){            
                   
            $(".turn1 #expand"). prop( "disabled", true );
            $(".turn1 #troops"). prop( "disabled", true );
            $(".turn1 #conquer").prop( "disabled", true );
        });                

    } else if (this.turn === 2){
               
        $(".turn1 #expand") .prop( "disabled", true);
        $(".turn1 #troops") .prop( "disabled", true);
        $(".turn1 #conquer").prop( "disabled", true);
        $(".turn2 #expand") .prop( "disabled", false);
        $(".turn2 #troops") .prop( "disabled", false);
        $(".turn2 #conquer").prop( "disabled", false);

        $(".turn2 #expand").on('click', function(){  
            $(".board").removeClass('blocked');                  
            game.expand(this.turn);
            $(".turn2 #expand"). prop( "disabled", true );
            $(".turn2 #troops"). prop( "disabled", true );
            $(".turn2 #conquer").prop( "disabled", true );
        });
        
        $(".turn2 #troops").on('click', function(){   
            $(".board").removeClass('blocked');          
            game.moreTroops();
            $(".turn2 #expand"). prop( "disabled", true );
            $(".turn2 #troops"). prop( "disabled", true );
            $(".turn2 #conquer").prop( "disabled", true );
        });

        $(".turn2 #conquer").on('click', function(){            
                       
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
