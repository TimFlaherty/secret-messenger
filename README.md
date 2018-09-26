# Secret Messenger v0.5
### Superficially Encrypted Chat App

Secret Messenger is a simple chat app which 
encrypts and decrypts messages using a secret 
word or phrase defined by the user. NodeJS
serves a Socket.IO chat room and also provides
an encrypt/decrypt API. 

### Installation & Use
Clone the repository:
```bash
git clone https://github.com/TimFlaherty/secret-messenger
```

From the cloned directory, install dependencies:
```bash
cd secret-messenger
npm install
```

Initialize server:
```bash
npm start
```

By default, Secret Messenger will serve to localhost:3030.
To use Secret Messenger, navigate to localhost:3030 and
start a chat!

Thanks to Socket.IO for providing an awesome 
starting point with their chat example:

https://github.com/socketio/chat-example
