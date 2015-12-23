var game = {
    left: 0,
    right: 0,
    
    incr: function(id) {
        game[id] += 1;
        game.update(id);
        io.socket.post('/tap', { side: id });
    },
    
    update: function(id) {
        $('#'+id).children('.numtaps').text(game[id]);
    }
};

$(document).ready(function() {
    $('.tapper').mousedown(function(){
        $(this).addClass('tap');
    }).mouseup(function(){
        $(this).removeClass('tap');
        game.incr($(this).attr('id'));
    });
    
    io.socket.on('message', function(data) {
        game[data['side']] = data['taps'];
        game.update(data['side']);
    });
    
    io.socket.get('/count', function(data) {
        for ( i of data)
        {
            console.log(i);
            game[i.side] = i.taps;
            game.update(i.side);
        }
    });
});
