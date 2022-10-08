// use the express library
const express = require('express');

// create a new server application
const app = express();

// Define the port we will listen on
// (it will attempt to read an environment global
// first, that is for when this is used on the real
// world wide web).
const port = process.env.PORT || 3000;

let nextVisitorId = 1;
const {encode} = require('html-entities');
const cookieParser = require('cookie-parser');
// ... snipped out code ...

app.use(cookieParser());

app.get('/', (req, res) => {

  if (isNaN(req.cookies['visitorId'])){
  nextVisitorId++;
  }
  res.cookie('visitorId', nextVisitorId);
  res.cookie('visited', Date.now().toString());

  var last_visit = "";
  var lstTime = Math.floor((new Date() - req.cookies['visited'])/1000)%60  
  if(isNaN(lstTime)){
    last_visit = "You have never visited";
  }
  else {
  last_visit = "It has been " + lstTime + " seconds since your last visit";
 }
    res.render('welcome', {
        name: req.query.name || "World!!",
        how_long:`${last_visit}`,
        id: req.cookies['visitorId'] || nextVisitorId
      });
});

// Start listening for network connections
app.listen(port);

// Printout for readability
console.log("Server Started!");

// To tell about public folder
app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');
