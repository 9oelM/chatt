var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://joelmun:ansgurwn1!@chat-shard-00-00-ab0gn.mongodb.net:27017,chat-shard-00-01-ab0gn.mongodb.net:27017,chat-shard-00-02-ab0gn.mongodb.net:27017/test?ssl=true&replicaSet=Chat-shard-0&authSource=admin&retryWrites=true";
MongoClient.connect(uri, function(err, db) {
  // Paste the following examples here
    
  db.close();
});