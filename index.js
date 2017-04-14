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

    socket.on('room creation', r => {
        socket.join(r.name);
        room = r.name;
        users.push({roomname: room, username: r.user, id: socket.id});
        io.to(room).emit('user join', io.sockets.adapter.rooms[room] ? users : 0);
    });

    socket.on('disconnect', () => {
        users = users.filter(u => u.id !== socket.id)
        io.to(room).emit('user disconnect', io.sockets.adapter.rooms[room] ? users : 0);
    });

    socket.on('chat message', msg => {
        io.to(room).emit('chat message', msg);
    });

    socket.on('user typing', user => {
        io.to(room).emit('user typing', user);
    });

});

http.listen(3000, () => console.log('listening on 3000'));
