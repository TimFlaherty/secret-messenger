//Index page initialization function sets cookie and redirects to chat template
function go() {
	var secret = $('#secret').val();
	var sn = $('#sn').val();
	var ucolor = $('#ucolor').val();
	document.cookie = "secret="+secret;
	document.cookie = "sn="+sn;
	document.cookie = "ucolor="+ucolor;
	$.ajax({url: '/encrypt', 
		type: 'post',
		data: {
			key: secret,
			msg: secret
		}
	}).done(function (data) {
		window.location="/chat?id="+data;
	})
}

//Parse variables from cookie data
var sn = '';
var ucolor = '';
var secret = '';
var dough = document.cookie.split(';');
for(i=0;i<dough.length;i++){
	chip = dough[i].split('=');
	if(chip[0].includes('sn')){
		sn = chip[1];
	} else if(chip[0].includes('ucolor')){
		ucolor = chip[1];
	} else if(chip[0].includes('secret')){
		secret = chip[1];
	};
}

//Initialize toggle variable
var toggle = 0;

//Arrays to store chat messages
var chatray = [];
var nochatray = [];

//Toggle encryption off
function show() {
	var convo = $('.msg');
	convo.each(function(i){
		$(this).text(chatray[i]);
	});
	toggle = 1;
}

//Toggle encryption on
function hide() {
	var convo = $('.msg');
	convo.each(function(i){
		$(this).text(nochatray[i]);
	});
	toggle = 0;
}

//Erases chat and cached messages
function erase() {
	$('#messages').html('');
	chatray = [];
	nochatray = [];
	toggle=0;
}

//Converts hex color values to RGB
function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
	? [
		parseInt(result[1], 16),
		parseInt(result[2], 16),
		parseInt(result[3], 16)
	]
	: [0, 0, 0];
}

//Selects black or white text based on hex color input
function lum(hex) {
	var rgb = hexToRgb(hex)
	var lrgb = [];
	rgb.forEach(function(c) {
		c = c / 255.0;
		if (c <= 0.03928) {
			c = c / 12.92;
		} else {
			c = Math.pow((c + 0.055) / 1.055, 2.4);
		}
		lrgb.push(c);
	});
	var lum = 0.2126 * lrgb[0] + 0.7152 * lrgb[1] + 0.0722 * lrgb[2];
	return lum > 0.179 ? "#000000" : "#ffffff";
}