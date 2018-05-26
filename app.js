var express = require('express');
var path = require('path');
var socketIo = require('socket.io');
var http = require('http');
const port = 3000;
var _ = require('lodash');

var app = express();
var server = http.Server(app);
var io = socketIo(server);
var connectedUsers = [];
var messages = [];

io.on('connection', (socket) => {
    console.log('+++ --> new connection with id:' + socket.id);
    socket.on('join', data => {
        socket.username = data.username;
        connectedUsers[socket.username] = socket;
        let userObj = {
            username: data.username,
            socketid: socket.id
        };
        connectedUsers.push(userObj);
        console.log(`connected users:${JSON.stringify(connectedUsers)}`);
        io.emit('all-users', connectedUsers);
    });

    socket.on('send-message', (newMessage) => {
        messages.push(newMessage);
        console.log('message received from client');
        // socket.broadcast.emit('message-received', messages);
        io.emit('message-received', newMessage);
    });

    socket.on('disconnect', () => {
        _.remove(connectedUsers, user => user.socketid == socket.id);
        io.emit('all-users', connectedUsers);
        console.log(`--- --> socket with id:${socket.id} is disconnected!`);
        console.log('-----------------------------------------------------');
    })
})


server.listen(port, () => {
    console.log('listening on port:' + port);
})


