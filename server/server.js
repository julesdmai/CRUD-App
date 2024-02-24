// import libraries
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// import controllers

// port for server
const PORT = 3000;

// handle parsing request body

// connect to mongoDB

// handle requests for static files
app.use(express.static(path.join(__dirname, '../public')));
// attempting to leverage express.static // cannot because desire for clean URLs

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

app.get('/login', (req, res) => {
    console.log('routed through "/login"');
    const filePath = path.join(__dirname, '../public/login.html');
    return res.status(200).sendFile(filePath);
})

app.get('/home', (req, res) => {
    console.log('routed through "/home"');
    const filePath = path.join(__dirname, '../public/home.html');
    return res.status(200).sendFile(filePath);
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
  return res.status(errorObject.status).json(errorObject.message);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});