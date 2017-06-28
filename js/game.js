function Game() {

    this.action = null;    
    this.turn = 1;    

    for (var row = 0; row < 4; row++) {
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

    this.setEventListeners();
}

Game.prototype.setEventListeners = function() {
     
     // Use this and that to prevent lose the context inside
     var that = this;

     $(".cell").on('click', function(){
    
        if (that.action === 'expand'){
            
            if (that.turn === 1){ $(this).addClass('player1'); } 
            else { $(this).addClass('player2'); }

            $(this).attr( "player", game.turn);   
            $(this).attr( "troops", 1);    
            
            ($(this)[0].children[0]).innerHTML = $(this).attr('troops');
            
            console.log('-------------- EXPAND --------------');        
            console.log($(this)[0]);        
            console.log("data-row: " + $(this).attr('data-row'));        
            console.log("data-col: " + $(this).attr('data-col'));
            console.log("troops: "   + $(this).attr('troops'));              
            console.log("Player turn: " + that.turn);
            console.log('------------ END EXPAND -------------');

            // Disable board events until Player click next turn        
            $(".board").addClass('blocked');

        } else if (that.action === 'troops'){

            console.log('----------- MORE TROOPS ------------');
            var troops = parseInt($(this).attr('troops'));            
            console.log("The player " + $(this).attr('player') + " have : " + troops + " units of troops");
                                    
            if ($(this).attr('player') == that.turn){  
                console.log("troops before increase: " + troops);
                troops += 3; 
                console.log("troops after increase: " + troops);                           
                $(this).attr('troops', troops); 
                $(this)[0].children[0].innerHTML = troops;                
            } else {
                alert("This Node is not yours!");
            }
            console.log('--------- END MORE TROOPS -----------');

            $(".board").addClass('blocked');

        }else if (that.action === 'conquer'){

            var attackerArray = [];
            var deffenderArray = [];            
            var attackerClicked = false;

            if (!attackerClicked){
                console.log('------------- CONQUER ---------------');
                var attackerRow = parseInt($(this).attr('data-row'));
                console.log("Row: " + attackerRow);
                var attackerCol = parseInt($(this).attr('data-col'));
                console.log("Col: " + attackerCol);
                var attackerPlayer = parseInt($(this).attr('player'));
                console.log("Player: " + attackerPlayer);
                var attackerTroops = parseInt($(this).attr('troops'));
                console.log("Player troops: " + attackerTroops);
                console.log('----------- END CONQUER--------------');

                attackerClicked = true;
                
                for (var i = 0; i<attackerTroops; i++){
                    attackerArray.push(Math.floor(Math.random() * 6) + 1);                    
                }
                
                attackerArray.sort();

            } else{                
                
                console.log('------------------------------------');
                var defenderRow = parseInt($(this).attr('data-row'));
                console.log("Row: " + defenderRow);
                var defenderCol = parseInt($(this).attr('data-col'));
                console.log("Col: " + defenderCol);
                var defenderPlayer = parseInt($(this).attr('player'));
                console.log("Player: " + defenderPlayer);
                var defenderTroops = parseInt($(this).attr('troops'));
                console.log("Player troops: " + defenderTroops);
                console.log('------------------------------------');
                        
                for (var i = 0; i<deffenderArray; i++){
                    deffenderArray.push(Math.floor(Math.random() * 6) + 1);                    
                }

                deffenderArray.sort();                

                //$(".board").addClass('blocked');
            }   

            var timesLoop;
            if(attackerArray.length <= deffenderArray.length){
                timesLoop = attackerArray.length;
            } else{
                timesLoop = deffenderArray.length;
            }

            for (var j = timesLoop; j<0; j--){
                if (attackerArray[j] >= deffenderArray[j]){
                    
                }
            }


            // is attackerClicked set
            // if not set attackerClicked to the current cell
            //    tell the user to pick another cell
            // else
            //  check if clicking the same cell
            //  do your logic
            // attackerClicked is false


            
            

                                 

            // $(".board").addClass('blocked');
        }

     });

}

Game.prototype.moreTroops = function(){    
    this.action = 'troops';
};

Game.prototype.expand = function(){
    this.action = 'expand';
};

Game.prototype.conquer = function(){
    this.action = 'conquer';
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
            $(".board").removeClass('blocked');      
            game.conquer(); 
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
            game.expand();
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
            $(".board").removeClass('blocked');       
            game.conquer();         
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
