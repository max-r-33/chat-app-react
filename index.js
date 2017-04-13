const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static('src'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let users = [];

io.on('connection', socket => {
    let room;
    
    socket.on('room creation', roomObj => {
        room = roomObj.roomname;
        socket.join(roomObj.roomname);
        users.push({username:roomObj.username, roomName: room, socketID: socket.id});
        io.to(room).emit('user join', io.sockets.adapter.rooms[room] ? io.sockets.adapter.rooms[room].length : 0);
    });

    socket.on('disconnect', () => {
        users = users.filter(u => {
            return u.socketID !== socket.id && u.roomName !== room
        })
        io.to(room).emit('user disconnect', io.sockets.adapter.rooms[room] ? io.sockets.adapter.rooms[room].length : 0);
    });

    socket.on('chat message', msg => {
        io.to(room).emit('chat message', msg);
    });

    socket.on('user typing', user => {
        io.to(room).emit('user typing', user);
    });

    socket.on('get users', () => {
        io.to(room).emit('user list', users);
    });
});

http.listen(3000, () => console.log('listening on 3000'));
