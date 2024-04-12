// io.js

import { Server } from 'socket.io';

export function initializeSocketIO(httpServer) {
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.on('chat message', (msg) => {
            console.log('Message received:', msg);
            io.emit('chat message', msg);
        });
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return io;
}
