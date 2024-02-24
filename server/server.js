// Import libraries
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// import middleware
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const cookieController = require('./controllers/cookieController');

// Initialize express app
const app = express();

// Port for server
const PORT = 3000;

// Handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to mongoDB
mongoose.connect('mongodb+srv://julesdmai:zoPQKk8WWTFxicMj@attempt01.noejrg3.mongodb.net/?retryWrites=true&w=majority&appName=Attempt01');
mongoose.connection.once('open', () => {
    console.log('Connected to Database');
});


// Handle requests for static files
app.use(express.static(path.join(__dirname, '../public')));
// attempting to leverage express.static // cannot because want clean URLs

app.get('/', (req, res) => {
    console.log('routed through "/"');
    const filePath = path.join(__dirname, 'index.html');
    return res.status(200).sendFile(filePath);
})

app.get('/signup', (req, res) => {
    console.log('routed through "/signup"');
    const filePath = path.join(__dirname, '../public/signup.html');
    return res.status(200).sendFile(filePath);
})

app.post('/signup', userController.createUser, (req, res) => {
    console.log('routed through "/signup POST"');
    const filePath = path.join(__dirname, '../public/login.html');
    return res.status(201).sendFile(filePath);
})

app.get('/login', (req, res) => {
    console.log('routed through "/login"');
    const filePath = path.join(__dirname, '../public/login.html');
    return res.status(200).sendFile(filePath);
})
// sessionController.startSession,
app.post('/login', userController.verifyUser, (req, res) => {
    console.log('routed through "/login" POST');
    const filePath = path.join(__dirname, '../public/home.html');
    return res.status(200).sendFile(filePath);
})

app.get('/home', (req, res) => {
    console.log('routed through "/home"');
    const filePath = path.join(__dirname, '../public/home.html');
    return res.status(200).sendFile(filePath);
})

app.get('/users', userController.getUsers, (req,res) => {
    console.log('routed through "/users"');
    return res.status(200).json(res.locals.users);
})

// 404 handler
app.get('*', (req, res) => {
    console.log('unable to route, returning 404');
    const filePath = path.join(__dirname, '../public/error.html');
    return res.status(404).sendFile(filePath);
});


// Global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Unknown middleware error caught',
    status: 500,
    message: { error: 'An error occured'}
  }
  // respond with updated error message
  const errorObject = Object.assign({}, defaultError, err);
  return res.status(errorObject.status).json(errorObject.message.err);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});