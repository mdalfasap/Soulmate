import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connect from './database/connect.js';
import router from './router/route.js';
const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer);

app.use(cors(), express.json());

const port = 8080;

// const socketMiddleware = (socket) => {
//     console.log("New Connection");
//     socket.on("disconnect", () => {
//         console.log("Connection closed");
//     });
//     socket.on("message", (msg) => {
//         console.log(msg);
//         io.emit("board_content", msg);
//     });
// };

// io.on("connection", socketMiddleware);


app.use('/api', router);

// Start the server after connecting to the database
connect().then(() => {
    httpServer.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.log('Invalid connection', err);
});



// import express from 'express';
// import connect from './database/connect.js';
// import cors from 'cors';
// import router from './router/route.js';
// import { initializeSocketIO } from './middleware/io.js';

// const app = express();

// app.use(cors(), express.json());

// const port = 8080;

// const httpServer = app.listen(port, () => {
//     console.log('Server running on port', port);
// });

// // Create the socket.io server instance
// const io = initializeSocketIO(httpServer);

// // Use the router for handling API routes
// app.use('/api', (req, res, next) => {
//     req.io = io; // Attach io to req object
//     next(); // Call the next middleware function
// }, router);

// // Connect to the database
// connect().then(() => {
//     console.log('Connected to the database');
// }).catch(err => {
//     console.log('Failed to connect to the database:', err);
// });
