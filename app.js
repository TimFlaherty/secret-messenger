"use strict";
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

const port = process.env.PORT || 3030;

//Include encryption module
const {crypt, dcrypt} = require('./crypt.js');

//bodyParser to interpret POST data
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Serve index
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//Serve CSS
app.get('/style', function(req, res){
  res.sendFile(__dirname + '/sm.css');
});

//Basic socket chat function
io.on('connection', function(socket){
	console.log('new user connected');
	socket.on('chat message', function(msg){
    	io.emit('chat message', crypt('traps', msg));
	});
});

//Decryption API
app.post('/decrypt', function(req, res){
	var key = req.body.key;
	var msg = req.body.msg;
	res.send(dcrypt(key, msg));
});

//Encryption API
app.post('/recrypt', function(req, res){
	var key = req.body.key;
	var msg = req.body.msg;
	res.send(crypt(key, msg));
});

//Serve to port and log message
http.listen(port, function(){
  console.log('listening on *:' + port);
});
