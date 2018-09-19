"use strict";
const app = require('express')();
const http = require('http').Server(app);
const https = require('https').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3030;

//Include encryption module
const {crypt, dcrypt} = require('./crypt.js');

//bodyParser to interpret POST data
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//cookieParser for session handling
app.use(cookieParser());

//Initialize EJS templating engine
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

//Serve index
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

//Serve CSS
app.get('/style', function(req, res){
	res.sendFile(__dirname + '/sm.css');
});

//Serve JS
app.get('/script', function(req, res){
	res.sendFile(__dirname + '/sm.js');
});

//Serve chat
app.get('/chat', function(req, res){
	res.render(__dirname + '/chat.html', {id: req.query.id});
	//Socket chat namespace defined by secret word
	var chat = io.of('/'+req.query.id);
	chat.on('connection', function(socket){
		chat.emit('hello', 
			{
				greeting: req.cookies.sn+' joined the chat',
				ucolor: req.cookies.ucolor
			});
		chat.removeAllListeners();
		socket.on(req.query.id, function(msg){
			chat.emit(req.query.id, 
				{ 
					raw: msg,
					crypted: crypt(req.cookies.secret, msg),
					sn: req.cookies.sn,
					ucolor: req.cookies.ucolor
				}
			);
		});
	});
});

//Decryption API
app.post('/decrypt', function(req, res){
	var key = req.body.key;
	var msg = req.body.msg;
	res.send(dcrypt(key, msg));
});

//Encryption API
app.post('/encrypt', function(req, res){
	var key = req.body.key;
	var msg = req.body.msg;
	res.send(crypt(key, msg));
});

//Serve to port and log message
http.listen(port, function(){
  //console.log('listening on *:' + port);
});
