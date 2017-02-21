var express = require('express')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
var cors = require('cors');

app.use(express.static('src'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');
    var room;

    socket.on('room creation', function(roomName) {
        socket.join(roomName);
        console.log('joined ' + roomName);
        room = roomName;
        var clients = io.sockets.adapter.rooms[roomName].sockets;
        for(var client in clients){
            console.log(client);
        }
        io.to(room).emit('user join', io.sockets.adapter.rooms[room] ? io.sockets.adapter.rooms[room].length : 0);
    })

    socket.on('disconnect', function() {
        console.log('user disconnected');
        io.to(room).emit('user disconnect', io.sockets.adapter.rooms[room] ? io.sockets.adapter.rooms[room].length : 0);
    });

    socket.on('chat message', function(msg) {
        console.log('msg ' + msg.message + ' to users in ' + msg.room + ' from ' + msg.user);
        io.to(room).emit('chat message', msg);
    });

    socket.on('user typing', function(user) {
        console.log(user + ' is typing');
        io.to(room).emit('user typing', user);
    });

    socket.on('user stop typing', function(user) {
        console.log(user + ' stopped typing');
    });

});

http.listen(3000, function() {
    console.log('listening on 3000');
})
