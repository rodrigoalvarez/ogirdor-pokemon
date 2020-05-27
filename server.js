var express = require('express');
var request = require('request');
var path = require('path');

var app = express();

// Main Page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Static content
app.use(express.static(__dirname + '/public'));

// Get Pokemon
app.get('/pokemon', function (req, res) {
  var pokemon = req.query.name;
  request('https://pokeapi.co/api/v2/pokemon/' + pokemon, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
      } else {
        res.end();
      }
  });
});

// Start App
app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
