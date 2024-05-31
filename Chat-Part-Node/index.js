const express = require('express');
const app = express();
 
const user = require('./src/Router/UsersRouter.js');
const chat = require('./src/Router/ChatRouter.js');
const message = require('./src/Router/MessageRouter.js');


const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const mongoConnection = require('./Database/dbConnection.js');
mongoConnection();

// Set up server to listen on specified port (default to 3000)
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Middleware
app.use(cors());
app.use(express.json());
  
// Routes 
app.use('/api/user', user);
app.use('/api/chat', chat);
app.use('/api/message', message)
// 404 route
app.use('*', (req, res) => {
  res.status(404).json({ 'Msg': 'I Can\'t Found' });
});   