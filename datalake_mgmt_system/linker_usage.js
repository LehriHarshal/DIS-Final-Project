/*var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test');*/
var linker = require('./linker.js');

var db = require('./db')
//var db = new Db('test', new Server('localhost', 27017), {safe:false});
db.connect('mongodb://localhost:27017/test', function(err, db) {
  if (err) {
    console.log('Unable to connect to DB.')
    process.exit(1)
  }
  if(db){
  	var keyValueCollection = db.collection('keyValueCollection');
	var linkCollection = db.collection('linkCollection');

	//db.open(function(err, db) {
	//Example DB Initialization START. Remove Later
	keyValueCollection.remove();
	linkCollection.remove();
	keyValueCollection.insert({key : "key1", value: "abc", source:"myfile.pdf"},null);
	keyValueCollection.insert({key : "key2", value: "myfile.txt", source:"myfile.xml"},null);
	keyValueCollection.insert({key : "key3", value: "key1", source:"myfile.txt"},null);
	//Example DB Initialization END.

	linker.async_linker(db, 'keyValueCollection', 'linkCollection');
	


  }

});
/*var keyValueCollection = db.get('keyValueCollection');
var linkCollection = db.get('linkCollection');

//Example DB Initialization START. Remove Later
keyValueCollection.remove();
linkCollection.remove();
keyValueCollection.insert({key : "key1", value: "abc", source:"myfile.pdf"},null);
keyValueCollection.insert({key : "key2", value: "myfile.txt", source:"myfile.xml"},null);
keyValueCollection.insert({key : "key3", value: "key1", source:"myfile.txt"},null);
//Example DB Initialization END.

linker.async_linker('keyValueCollection', 'linkCollection');*/

//linkerPromise.success(function(){console.log("Async function call for inserting links in Mongodb have been issued, but may not have been written yet")});







