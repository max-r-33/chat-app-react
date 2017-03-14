var express = require('express')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
var cors = require('cors');

app.use(express.static('src'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    var room;

    socket.on('room creation', (roomName) => {
        socket.join(roomName);
        room = roomName;
        var clients = io.sockets.adapter.rooms[roomName].sockets;
        io.to(room).emit('user join', io.sockets.adapter.rooms[room] ? io.sockets.adapter.rooms[room].length : 0);
    });

    socket.on('disconnect', () => {
        io.to(room).emit('user disconnect', io.sockets.adapter.rooms[room] ? io.sockets.adapter.rooms[room].length : 0);
    });

    socket.on('chat message', (msg) => {
        io.to(room).emit('chat message', msg);
    });

    socket.on('user typing', (user) => {
        io.to(room).emit('user typing', user);
    });

});

http.listen(3000, () => {
    console.log('listening on 3000');
})
