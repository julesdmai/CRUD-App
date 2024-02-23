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
app.use(express.static(__dirname))

// handles loading the initial html page
app.get('/', (req, res) => {
    console.log("Routed through '/'");
    const route = path.join(__dirname, 'index.html');
    return res.sendFile(route);
})

app.get('/signup', (req, res) => {
    return res.status(200).json({});
})

app.get('/login', (req, res) => {
    return res.status(200).json({});
})

app.get('/home', (req, res) => {
    return res.status(200).json({});
})


// 404 handler
app.get('*', (req, res) => {
    console.log('unestablished route attempted, returning 404 error');
    return res.status(404).sendFile(path.join(__dirname, 'error.html'));
})


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