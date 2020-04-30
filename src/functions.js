import io from 'socket.io-client';

const server = 'http://192.168.1.152:8000'

const socket = io(server,{transports: ['websocket'], upgrade: false});

function onboard(user, cb) {
  socket.emit('onboard', user);
}

function move(data) {
  socket.emit('move', data);
}

function listenToUserData(cb) {
  socket.on('render', data => cb(data));
}

function start() {
  socket.emit('start');
}



export { onboard, socket, move, listenToUserData, start }
