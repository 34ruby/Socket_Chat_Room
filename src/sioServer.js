

import http from 'http';
import socketio from 'socket.io';
import express from 'express';
import { doesNotMatch } from 'assert';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views'); // static assets
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));

const server = http.createServer(app);

const sioServer = socketio(server);
const handleListen =() =>  {
    console.log(`Socket IO Server is Listening on http://localhost:3000`);
}

server.listen(3000, handleListen);

function publicRooms() {
    const {
        sockets:{adapter: {sids, rooms}} 
    } = sioServer;
    const public_rooms = [];
    rooms.forEach((_, key) => { 
        // rooms에만 있는 key를 찾아라
        // rooms에 있는 각 key에 대해서 sids에서 그 키를 찾아본다. 
        // 그런데 없으면 ... 그 키가 공용방 이름이다.
        // 있으면 그 놈은 독방 이름 (sid, socket id)이다.
        if (sids.get(key) === undefined) {
            public_rooms.push(key);
        } 
    })
    return public_rooms
}

function countUser(roomName) {
    return sioServer.sockets.adapter.rooms.get(roomName)?.size;
}

sioServer.on('connection', (socket) => {
    socket['nickname'] = 'Anonymous'
    // console.log(socket);
    socket.onAny((event) => {
        console.log(sioServer.sockets.adapter)
        console.log(`Socket Event: ${event}`);
    });
    socket.on('enter_room', (roomName) => {
        // console.log(msg);
        // console.log(socket.rooms);
        socket.join(roomName);
        // setTimeout(() => {
        //     done();
        // }, 3000);
        // done();
        socket.to(roomName).emit('welcome', socket.nickname, countUser(roomName));
        // 다른 유저 외에도 자신에게도 welcome이벤트와 함께, 그 방에 있는 사용자 수를 전달 
        socket.emit('welcome', socket.nickname, countUser(roomName))
        sioServer.sockets.emit('room_change', publicRooms());
        // 모든 public room에 room_change 이벤트를 전달하지 뭐야...
    });
    socket.on('disconnecting', () => {
        socket.rooms.forEach(aRoom => {
            socket.to(aRoom).emit('bye ', socket.nickname, countUser(aRoom)-1);
        });
    });

    socket.on('disconnect', ()=>{
        sioServer.sockets.emit('room_change', publicRooms())
    })

    socket.on('new_message', (msg, room, done) => {
        socket.to(room).emit('new_message', `${socket.nickname} : ${msg}`);
        done();
    });

    socket.on('nickname', (nickName, done) => {
        socket['nickname'] = nickName;
        done();
        socket.emit('room_change', publicRooms())
    })
});