const crypto = require('crypto');

//Encryption function
function crypt(secret, msg) {
	const cipher = crypto.createCipher('AES256', secret);
	let encrypted = cipher.update(msg, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	return encrypted;
}

//Decryption function
function dcrypt(secret, hash) {
	var key = crypto.createDecipher('AES256', secret);
	try {
		var msg = key.update(hash, 'hex', 'utf8')
		msg += key.final('utf8');
		return msg;
	} catch (ex) {
		return 'Incorrect secret word';
	}
}

//Export functions for inclusion elsewhere
module.exports.crypt = crypt;
module.exports.dcrypt = dcrypt;