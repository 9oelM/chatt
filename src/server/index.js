const express = require('express');
const os = require('os');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const Message = require('./models/message');
const router = require("./routes/index")(app, Message)
const ObjectId = require('mongodb').ObjectID

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
http.listen(8080, function(){
  console.log('listening on *:8080');
});
/*
app.post('/api/message', function(req, res){
    var msg = new Message();
    msg.id = new ObjectId()
    msg.author = req.body.author;
    msg.content = req.body.content;
    msg.published_date = new Date(req.body.published_date);

    msg.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });
});*/

const io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg.content);
    io.emit('chat message', msg.content);
    let message = new Message();
    message.id = new ObjectId()
    message.author = msg.author
    message.content = msg.content
    message.published_date = new Date(msg.published_date);

    message.save(function(err){
        if(err){
            console.error(err);
            console.log("data save failed")
            return;
        }
        console.log("data save successful")
    });
  });
});

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/chat');
