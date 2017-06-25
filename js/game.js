function Game() {

  for (var row = 0; row < 10; row++) {
    for (var col = 0; col < 10; col++) {
      $('.container').append($('<div>')
        .addClass('cell')
        .attr('data-row', row)
        .attr('data-col', col)                
      );
    }    
  }

  
}

$(document).ready(function() {
  game = new Game();


});