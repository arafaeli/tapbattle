class Game
    constructor: (@left=0, @right=0) ->
        io.socket.on 'message', (data) => @update(data.side, data.taps)
        io.socket.get '/count', (data) =>
            @update(d.side, d.taps) for d in data
        
    update: (id, amount) ->
        @[id] = amount
        $("##{id} .numtaps").text @[id]
        
    incr: (id) ->
        @update id, @[id] + 1
        io.socket.post '/tap', side: id
    
$(document).ready () ->
    g = new Game
    $('.tapper').mousedown ->
        $(this).addClass 'tap'
    .mouseup ->
        $(this).removeClass 'tap'
        g.incr $(this).attr('id')
    