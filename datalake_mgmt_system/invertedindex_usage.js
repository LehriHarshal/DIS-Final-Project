//var mongo = require('mongodb'), Db = mongo.Db, Server = require('mongodb').Server;
var invertedindex = require('./invertedindex.js');
var db = require('./db')
//var db = new Db('test', new Server('localhost', 27017), {safe:false});
db.connect('mongodb://localhost:27017/test', function(err, db) {
  if (err) {
    console.log('Unable to connect to DB.')
    process.exit(1)
  }
  if(db){
  	var keyValueCollection = db.collection('keyValueCollection');
	var invertedIndexCollection = db.collection('invertedIndexCollection');

	//db.open(function(err, db) {
	//Example DB Initialization START. Remove Later
	keyValueCollection.remove();
	invertedIndexCollection.remove();
	keyValueCollection.insert({key : "key1", value: "abc adsd asdasd", source:"myfile.pdf"},null);
	keyValueCollection.insert({key : "key2", value: "myfile.txt asdasd asdas", source:"myfile.xml"},null);
	keyValueCollection.insert({key : "key3", value: "key1 asdasd asdasdasdasx", source:"myfile.txt"},null);
	//Example DB Initialization END.
	//});

	invertedindex.async_invertedindex(db, 'keyValueCollection', 'invertedIndexCollection');


  }

});
/*var keyValueCollection = db.collection('keyValueCollection');
var invertedIndexCollection = db.collection('invertedIndexCollection');

db.open(function(err, db) {
	//Example DB Initialization START. Remove Later
	keyValueCollection.remove();
	invertedIndexCollection.remove();
	keyValueCollection.insert({key : "key1", value: "abc adsd asdasd", source:"myfile.pdf"},null);
	keyValueCollection.insert({key : "key2", value: "myfile.txt asdasd asdas", source:"myfile.xml"},null);
	keyValueCollection.insert({key : "key3", value: "key1 asdasd asdasdasdasx", source:"myfile.txt"},null);
	//Example DB Initialization END.
});

invertedindex.async_invertedindex('keyValueCollection', 'invertedIndexCollection');
*/





