function Game() {

    this.action = null;    
    this.turn = 1;    
    this.attackerArray = []; //
    this.defenderArray = []; //

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
     attackerClicked = true;

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
                                
            if (attackerClicked){                
                that.superAttacker = this;
                console.log('------------- CONQUER ---------------');
                attackerRow = parseInt($(this).attr('data-row'));
                console.log("Row: " + attackerRow);
                attackerCol = parseInt($(this).attr('data-col'));
                console.log("Col: " + attackerCol);
                attackerPlayer = parseInt($(this).attr('player'));
                console.log("Player: " + attackerPlayer);
                attackerTroops = parseInt($(this).attr('troops'));
                console.log("Player troops: " + attackerTroops);
                console.log('----------- END CONQUER--------------');

                this.attackerClicked = true;
                
                for (var i = 0; i<attackerTroops; i++){
                    game.attackerArray.push(Math.floor(Math.random() * 6) + 1);                    
                }    

                attackerClicked = false;                            

            } else{ 

                attackerClicked = true;            
                there = this;
                console.log('------------------------------------');
                defenderRow = parseInt($(there).attr('data-row'));
                console.log("Row: " + defenderRow);
                defenderCol = parseInt($(there).attr('data-col'));
                console.log("Col: " + defenderCol);
                defenderPlayer = parseInt($(there).attr('player'));
                console.log("Player: " + defenderPlayer);
                defenderTroops = parseInt($(there).attr('troops'));
                console.log("Player troops: " + defenderTroops);
                console.log('------------------------------------');
                        
                for (var x = 0; x<defenderTroops; x++){
                    game.defenderArray.push(Math.floor(Math.random() * 6) + 1);                    
                }

                game.attackerArray.sort(function(a,b){
                    return a < b;
                });

                console.log("how many iterations attacker has? " + game.attackerArray.length);
                
                game.defenderArray.sort(function(a,b){
                    return a < b;
                });               
                console.log("how many iterations defender has? " + game.defenderArray.length);

                var timesLoop;

                if(game.attackerArray.length <= game.defenderArray.length){
                    timesLoop = game.attackerArray.length;
                    console.log("attackerArray has " + timesLoop + " length");
                } else{
                    timesLoop = game.defenderArray.length;
                    console.log("defenderArray has " + timesLoop + " length");
                }

                console.log('-------- BATTLE SIMULATOR-----------');            
                
                console.log("timesLoop: " + timesLoop);

                for (var j = 0; j<timesLoop; j++){                
                    if (game.attackerArray[j] >= game.defenderArray[j]){
                        defenderTroops--;
                        
                        $(this).attr( "troops", defenderTroops);
                        $(this)[0].children[0].innerHTML = $(this).attr('troops');
                        console.log("Attacker wins");
                        console.log("defender troops: " + defenderTroops);
                    } else{
                        attackerTroops--;
                        $(there).attr( "troops", attackerTroops);
                        $(there)[0].children[0].innerHTML = $(there).attr('troops');
                        console.log("Defender wins");
                        console.log("attacker troops: " + attackerTroops);
                    }
                }
                console.log('------------------------------------');

                if (attackerTroops <= 0){                
                    if (attackerPlayer === 1){

                        $(this).addClass('player2');
                        $(this).removeClass('player1');
                        $(this).attr( "player", defenderPlayer);   
                        // $(this).attr( "troops", 1); // half of the defense army
                        // $(this)[0].children[0].innerHTML = $(this).attr('troops');
                    } else {
                        
                        $(this).addClass('player1');
                        $(this).removeClass('player2');
                        $(this).attr( "player", defenderPlayer);   
                        // $(this).attr( "troops", 1); // half of the defense army
                        // $(this)[0].children[0].innerHTML = $(this).attr('troops');
                    }                                
                }

                if (defenderTroops <= 0){                
                    if (defenderPlayer === 1){

                        $(there).addClass('player2');
                        $(there).removeClass('player1');
                        $(there).attr( "player", attackerPlayer); 

                        if (defenderTroops === 1){
                            $(this).attr('troops', 1); 
                            $(this)[0].children[0].innerHTML = 1;
                        } else{
                            var dividedDef = defenderTroops / 2;                            
                            $(this).attr('troops', Math.floor(dividedDef)); 
                            $(this)[0].children[0].innerHTML = Math.floor(dividedDef);
                            
                            if (defenderTroops % 2 === 0){
                                $(game.superAttacker)[0].children[0].innerHTML = Math.floor(dividedAtt);    
                            }else{                        
                                $(game.superAttacker)[0].children[0].innerHTML = Math.floor(dividedAtt+1);
                            }

                            $(there).attr('troops', Math.floor(dividedDef)+1); 
                            $(there)[0].children[0].innerHTML = Math.floor(dividedDef+1);
                        }
                        

                    } else if (defenderPlayer === 2){
                        $(there).addClass('player1');
                        $(there).removeClass('player2');
                        $(there).attr( "player", attackerPlayer); 

                        if (attackerTroops === 1){
                            $(there).attr('troops', 1); 
                            $(there)[0].children[0].innerHTML = 1;
                        } else{

                            dividedAtt = attackerTroops / 2;                            
                            $(there).attr('troops', Math.floor(dividedAtt)); 
                            $(there)[0].children[0].innerHTML = Math.floor(dividedAtt); 
                               
                            if (attackerTroops % 2 === 0){
                                $(game.superAttacker)[0].children[0].innerHTML = Math.floor(dividedAtt); 
                                $(game.superAttacker).attr('troops', Math.floor(dividedAtt));   
                            }else{                        
                                $(game.superAttacker)[0].children[0].innerHTML = Math.floor(dividedAtt+1);
                                $(game.superAttacker).attr('troops', Math.floor(dividedAtt));   
                            }
                            
                        }

                    }

                    // reset the array
                    attackerArray = [];
                    defenderArray = [];
                }

                
                //$(".board").addClass('blocked');
            }   
            
            
                                 

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
